const express = require("express");
const router = express.Router();
const { prisma } = require('../../prisma-client')

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

router.post('/posts', async (req, res) => {
  try {
    const { user_id } = req.body
    console.log(req)
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: user_id
      }
    })
    // const all_posts = await prisma.post.findMany({
    //   include: {
    //     // posts: true,
    //   },
    // })
    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

module.exports = router;