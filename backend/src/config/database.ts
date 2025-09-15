import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
