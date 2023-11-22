import express from "express"
import CustomError from '../../configs/custom-error.js'
import { parseIdParam } from '../../middlewares/parse-id.js';
import { validateRequestBody } from '../../middlewares/validation.js';
import { create_post_schema, update_post_category_schema } from '../../validation-schemas/post-schemas.js';
import { prisma } from '../../configs/prisma-client.js';
const router = express.Router();

router.get('/posts', async (req, res) => {
  const { title, take, skip } = req.query

  const where = {
    title: {
      contains: title // Use 'contains' to perform a case-insensitive partial match
    },
  }

  const [ posts, count ] = await prisma.$transaction([
    prisma.post.findMany({ where, take, skip,
      include: {
        categories: {
          select: {
            name: true
          }
        },
        User: {
          select: {
            name: true
          }
        }
      }
    }),
    prisma.post.count({ where })
  ])

  res.formattedResponse({ data: posts, total_data_count: count }, 'Posts retrieved successfully')
})

// for connentOrCreate catgory
const getFomattedConnectCategories = async (categories) => {
  return {
    connectOrCreate: categories.map(category => {
      return { where: { name: category }, create: { name: category } }
    })
  }
}

const getFomattedDisconnectCategories = async (categories) => {
  return {
    disconnect: categories.map(category => ({name: category}))
  }
}

router.post('/posts', validateRequestBody(create_post_schema), async (req, res) => {
  const { user_id, title, body, categories } = req.body
  
  const user = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  })

  if (!user) {
    // Handle the case where the user is not found
    throw new CustomError({ message: 'User not found', statusCode: 404});
  }

  const data = {
    userId: user_id,
    title,
    body,
  }
  
  if (categories && categories.length > 0) {
    data['categories'] = await getFomattedConnectCategories(categories)
  }

  const new_post = await prisma.post.create({
    data,
    include: {
      categories: true,
    }
  });
  
  res.formattedResponse(new_post, 'Posts added successfully')
})


router.patch('/posts/:id/categories', parseIdParam, validateRequestBody(update_post_category_schema), async(req, res) => {

  const { categories } = req.body, { id } = req.params

  // detach all categories
  if (categories.length == 0) {
    await prisma.post.update({
      where: { id },
      data: {
        categories: { set: [] }, // Empty array disconnects all categories
      },
    })

    res.formattedResponse(null, 'Posts updated successfully')
  }

  const post_categories = await prisma.post.findUnique({
    where: { id },
    include: { 
      categories: {
        select: {
          name: true
        }
      }
    },
  });

  if (!post_categories) {
    throw new CustomError({ message: "Post Not Found", statusCode: 404 })
  }
  
  // ["News", "Sports", "Economics"]
  const old_categories = post_categories.categories.map(category => category.name)
  
  const newly_added_categories = categories.filter(item => !old_categories.includes(item))
  const removed_categories = old_categories.filter(item => !categories.includes(item))
  let t = null
  if (newly_added_categories.length > 0) {
    t = await attachCategories(id, newly_added_categories)
  }
  if (removed_categories.length > 0) {
    await detachCategories(id, removed_categories)
  }
  
  res.formattedResponse(null, 'Posts updated successfully')
})

const attachCategories = async (post_id, categories) => {
  const formatted = await getFomattedConnectCategories(categories)
  return await prisma.post.update({
    where: { id: post_id },
    data: {
      categories: formatted,
    },
  })
}

const detachCategories = async (post_id, categories) => {
  const formatted = await getFomattedDisconnectCategories(categories)
  return await prisma.post.update({
    where: { id: post_id },
    data: {
      categories: formatted,
    },
  })
}

export default router;