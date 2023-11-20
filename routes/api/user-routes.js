import express from "express"
import { parseIdParam } from '../../middlewares/parse-id.js';
import { validateRequestBody } from '../../middlewares/validation.js';
import { create_user_schema } from '../../validation-schemas/user-schemas.js';
import { prisma } from '../../configs/prisma-client.js';

const router = express.Router();

// get users route
router.get('/users', async (req, res) => {
  const all_users = await prisma.user.findMany({
    include: {
      posts: {
        select: {
          title: true,
        },
      },
      profile: true
    },
  })
  return res.json(all_users)
})

// get user detail
router.get('/users/:id', parseIdParam, async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      posts: {
        select: {
          title: true,
          body: true
        },
      },
      profile: true
    },
  })
  if (!user) {
    throw new CustomError({ message: "User Not Found", statusCode: 404 })
  }
  return res.json(user)
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
  return res.json(user_posts)
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