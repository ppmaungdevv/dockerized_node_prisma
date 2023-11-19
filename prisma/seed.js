import { categories } from './category.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('seeding...')
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  })
}

main().catch(e => {
  console.log(e);
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})