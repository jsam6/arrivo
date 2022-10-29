import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@gmail.com' },
        update: {},
        create: {
            username: 'alice',
            password: '123123',
            email: 'alice@gmail.com',
            fullname: 'Alice',
            membership: 'normal',
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'bob@gmail.com' },
        update: {},
        create: {
            username: 'bob',
            password: '123123',
            email: 'bob@gmail.com',
            fullname: 'bob',
            membership: 'premium',
        },
    })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})