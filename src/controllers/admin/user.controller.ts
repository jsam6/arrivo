import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

const createUser = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password, username, membership } = req.body

    if (!["normal", "premium"].includes(membership)) return res.status(401).send("Invalid membership")

    const hashed_pwd = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!))

    const userExist = await prisma.user.findFirst({
        where: {
            email : email
        }
    })

    if (userExist) return res.status(403).send({ status: false, message: "User already exists"});

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password:hashed_pwd,
                username,
                is_admin: 0,
                membership: membership
            }
        })

        return res.json({message: 'Successfully Created User', statusCode:200, status:true ,
            data: {
                email:user.email,
                username:user.username,
                is_admin: false
            }
        })
    } catch (err:any) {
        res.sendStatus(500) && next(err)
    }
}


export {
    createUser
}