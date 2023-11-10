const express = require("express");
const router = express.Router();
const { prisma } = require('../../prisma-client')

router.get('/users', async (req, res) => {
  const all_users = await prisma.user.findMany({
    include: {
      // posts: true,
    },
  })
  if (all_users.length < 2) {
    throw new CustomError('Simulated error with custom status code', 400);
  }
  return res.json(all_users)
})

router.post('/users', async (req, res) => {
  try {
    const { user_id } = req.body
    // const allUsers = await prisma.user.create({
    //   data: {
    //     name: 'prisma',
    //   }
    // })
    return res.json(user_id)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

module.exports = router;