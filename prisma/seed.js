import { users, posts, categories } from './seed-data.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('seeding...')
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  })
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  })
  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  })
}

main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})