const express = require("express");
const { validateRequestParam, validateRequestBody } = require('../../validation-middleware');
const { create_post_schema } = require('../../validation-schemas/post-schemas');
const router = express.Router();
const { prisma } = require('../../configs/prisma-client');
const CustomError = require("../../configs/custom-error");

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

router.get('/search/posts', async (req, res) => {
  const { title, page, size } = req.query
  const { take, skip } = Helpers.getPagination(page, size)

  const where = {
    title: {
      contains: title // Use 'contains' to perform a case-insensitive partial match
    },
  }

  const [ posts, count ] = await prisma.$transaction([
    prisma.post.findMany({ where, take, skip }),
    prisma.post.count({ where })
  ])

  const resp = Helpers.responseWithPagination({ data: posts, total_data_count: count, page, size })
  return res.json(resp)
})

router.post('/posts', validateRequestBody(create_post_schema), async (req, res) => {
  const { user_id, title } = req.body
  
  const user = await prisma.user.findUnique({
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