const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      // include: {
      //   posts: true,
      //   profile: true,
      // },
    })
    console.log('ok....')
    return res.json(allUsers)
    
  } catch (error) {
    console.log(error)
    return res.json(error)
    
  }
})

app.get('/t', async (req, res) => {
  const allUsers = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    }
  })
  console.log('ok....')
  return res.json(allUsers)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})