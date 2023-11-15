const express = require("express");
const { validateRequestParam, validateRequestBody } = require('../../validation-middleware');
const { create_user_schema } = require('../../validation-schemas/user-schemas');
const router = express.Router();
const { prisma } = require('../../configs/prisma-client')

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

module.exports = router;