/* 
* Initiate Prisma Client
*/
// const { PrismaClient } = require('@prisma/client')
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export {
  prisma
}