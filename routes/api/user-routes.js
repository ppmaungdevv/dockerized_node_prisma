import express from "express"
import { validateRequestParam, validateRequestBody } from '../../validation-middleware.js';
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