const express = require("express");
const { validateRequestParam, validateRequestBody } = require('../../validation-middleware');
const { create_user_schema } = require('../../validation-schemas/user-schemas');
const router = express.Router();
const { prisma } = require('../../prisma-client')

// get users route
router.get('/users', async (req, res) => {
  const all_users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  return res.json(all_users)
})

// create user route
router.post('/users', validateRequestBody(create_user_schema), async (req, res) => {
    const { user_id } = req.body
    // const allUsers = await prisma.user.create({
    //   data: {
    //     name: 'prisma',
    //   }
    // })
    return res.json(user_id)
})

module.exports = router;