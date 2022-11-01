import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

async function main() {

    const hashed_pwd = await bcrypt.hash("123456", parseInt(process.env.SALT_ROUNDS!))


    const alice = await prisma.user.upsert({
        where: { email: 'alice@gmail.com' },
        update: {},
        create: {
            username: 'alice',
            password: hashed_pwd,
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
            password: hashed_pwd,
            email: 'bob@gmail.com',
            fullname: 'bob',
            membership: 'premium',

        },
    })
    
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            username: 'admin',
            password: hashed_pwd,
            email: 'admin@gmail.com',
            fullname: 'admin',
            membership: 'premium',
            is_admin: 1
        },
    })
  console.log({ alice, bob, admin })
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