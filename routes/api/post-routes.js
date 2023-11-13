const express = require("express");
const { validateRequestParam, validateRequestBody } = require('../../validation-middleware');
const { create_post_schema } = require('../../validation-schemas/post-schemas');
const router = express.Router();
const { prisma } = require('../../prisma-client');
const CustomError = require("../../custom-error");

router.get('/posts', async (req, res) => {
  try {
    const all_posts = await prisma.post.findMany({
      include: {
        // posts: true,
      },
    })
    return res.json(all_posts)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

router.post('/posts', validateRequestBody(create_post_schema), async (req, res) => {
  const { user_id, title } = req.body
  
  const user = await prisma.user.findFirst({
    where: {
      id: user_id
    }
  })

  if (!user) {
    // Handle the case where the user is not found
    throw new CustomError({ message: 'User not found', statusCode: 404});
  }

  const newPost = await prisma.post.create({
    data: {
      title,
      userId: user_id, // Directly using userId
    },
  });
  
  return res.json(newPost)
})

module.exports = router;