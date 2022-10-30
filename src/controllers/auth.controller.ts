import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

const login = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email : email
        }
    })
    // const user = await User.scope('withPassword').findOne({ where: { email: email } })
    if (!user) return res.status(400).json({message:'Invalid Credentials', statusCode: 401, status: true})
    const compare_pwd = await bcrypt.compare(password, user.password)
    if (!compare_pwd) return res.json({message:'Invalid Credentials', statusCode: 401, status: true})

    const jwt_data = {
        user_id:user.user_id,
        username:user.username,
        email:user.email,
    }

    jwt.sign({user:jwt_data}, 'secretkey',  { expiresIn: '2 days'},(err:any, token:string)=> {
        if (err) {
            return res.send(err)
        }
        res.json({
            token:token,
            data: {
                email:user.email,
                username:user.username,
            }
        })
    })
}

const registerUser = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password, username } = req.body;
    const hashed_pwd = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!))

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password:hashed_pwd,
                username
            }
        })
        // const user = await User.create({ email, password:hashed_pwd, username });

        const jwt_data = {
            user_id:user.user_id,
            username:user.username,
            email:user.email,
        }
    
        jwt.sign({user:jwt_data}, 'secretkey',  { expiresIn: '2 days'},(err: any, token: string)=> {
            if (err) {
                return res.send(err)
            }
            res.json({message: 'Successfully Registered', statusCode:200, status:true ,
                token:token,
                data: {
                    email:user.email,
                    username:user.username,
                }
            })
        })

        next()
    } catch (err:any) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(403).send({ status: false, message: "User already exists"});
        } else {
            res.sendStatus(500) && next(err)
        }
    }
}


export {
    login,
    registerUser
}