import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

const adminLogin = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email : email,
            is_admin: 1
        }
    })

    if (!user) return res.status(400).json({message:'Invalid User', statusCode: 401, status: false})
    const compare_pwd = await bcrypt.compare(password, user.password)
    if (!compare_pwd) return res.json({message:'Invalid Credentials', statusCode: 401, status: false})

    const jwt_data = {
        user_id:user.user_id,
        username:user.username,
        email:user.email,
        is_admin: user.is_admin
    }

    jwt.sign({user:jwt_data}, process.env.JWT_SECRET_KEY,  { expiresIn: '2 days'},(err:any, token:string)=> {
        if (err) {
            return res.send(err)
        }
        res.json({
            token:token,
            data: {
                email:user.email,
                username:user.username,
                is_admin: user.is_admin == 1  ? true : false
            }
        })
    })
}


export {
    adminLogin
}