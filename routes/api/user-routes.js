import express from "express"
import CustomError from '../../configs/custom-error.js'
import { parseIdParam } from '../../middlewares/parse-id.js'
import { validateRequestBody } from '../../middlewares/validation.js'
import { create_user_schema } from '../../validation-schemas/user-schemas.js'
import { prisma } from '../../configs/prisma-client.js'

const router = express.Router();

// get users route
router.get('/users', async (req, res) => {
  const { name, take, skip } = req.query

  const where = {
    name: {
      contains: name // Use 'contains' to perform a case-insensitive partial match
    },
  }

  const [ users, count] = await prisma.$transaction([
    prisma.user.findMany({
      where, take, skip,
      include: {
        posts: {
          select: {
            title: true,
          },
        },
        profile: true
      },
    }),

    prisma.user.count({ where })

  ])

  res.formattedResponse({ data: users, total_data_count: count }, 'Users retrieved successfully')
})

// get user detail
router.get('/users/:id', parseIdParam, async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      _count: {
        select: { posts: true },
      },
      profile: true
    },
  })
  if (!user) {
    throw new CustomError({ message: "User Not Found", statusCode: 404 })
  }
  res.formattedResponse(user, 'Users retrieved successfully')
})

// get user's post
router.get('/users/:id/posts', parseIdParam, async (req, res) => {
  const { id } = req.params
  const user_posts = await prisma.post.findMany({
    where: {
      userId: id,
    },
    include: {
      categories: {
        select: {
          name: true
        }
      }
    }
  })
  /* 
  *   
  * User: {
  *   select: {
  *      name: true
  *     }
  *  }
  * instead of using above select with include
  * use this if you want to get posts with user infos 
  * 
  *
  const user_posts_with_user_info = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      // posts: {} // use empty {} to select all the fields in post
      posts: {
        select: {
          title: true,
          body: true,
          created_at: true,
          categories: {
            select: {
              name: true
            }
          },
        }
      }
    }
  })
  *
  *
  */
  return res.formattedResponse(user_posts, 'Users retrieved successfully')
})

// create user route
router.post('/users', validateRequestBody(create_user_schema), async (req, res) => {
  const { name, email, birthday, address } = req.body
  const allUsers = await prisma.user.create({
    data: {
      name,
      email,
      profile: {
        create: {
          address,
          birthday: new Date(birthday), // Example birthday date
        },
      }
    },
    include: {
      profile: true, // Include the profile data in the returned result
    }
  })
  return res.json(allUsers)
})

export default router;