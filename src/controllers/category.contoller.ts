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
        const result = await prisma.category.findMany()
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
    const { name, description, activated } = req.body;

    try {
        const result =  await prisma.category.create({
            data: {
                name,
                description: description,
                activated: activated,
            },
        })
        console.log(result)
        res.status(200).json({message: 'Successfully Created category', statusCode:200, status:true})
        next()
    } catch(e: unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

const view = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params

    try {
        const result = await prisma.category.findFirst({
            where: {
                category_id: parseInt(id)
            },
            include: {
                posts: true
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
    index,
    store,
    view
}