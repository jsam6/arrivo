import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()

declare module "express" { 
    export interface Request {
      token: any
    }
}

/*
 * call other imported services, or same service but different functions here if you need to
*/
const index = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await prisma.post.findMany()
        console.log(result)
        res.send(result)
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500) && next(e)
    }
}

const store = async (req:Request, res:Response, next:NextFunction)=> {
    let token = jwt.decode(req.token, 'secretkey')
    const { title, content, region_id, game_id } = req.body;
    console.log(token.user.user_id)
    try {
        const result =  await prisma.post.create({
            data: {
                title,
                body: content,
                category_id: 1,
                user_id: token.user.user_id,
            },
        })
        console.log(result)
        res.status(200).json({message: 'Successfully Created Post', statusCode:200, status:true})
        next()
    } catch(e: unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

const view = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params

    try {
        const result = await prisma.post.findFirst({
            where: {
                post_id: parseInt(id)
            },
            include: {
                user: true
            }
        })
        console.log(result)
        res.status(200).send(result)
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

export {
    index, store, view
}