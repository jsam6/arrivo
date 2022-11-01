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
        const result = await prisma.category.findMany({
            include: {
                posts: {
                    include : {
                        post: true
                    }
                }
            }
        })

        res.send(result)
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500) && next(e)
    }
}

const store = async (req:Request, res:Response, next:NextFunction)=> {
    let token = jwt.decode(req.token, process.env.JWT_SECRET_KEY)
    const { name, description, activated } = req.body;

    try {
        const result =  await prisma.category.create({
            data: {
                name,
                description: description,
                activated: activated,
            },
        })

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
                posts: {
                    include : {
                        post: true
                    }
                }
            }
        })
        if (!result) return res.status(200).send({})
        console.log(result)
        res.status(200).send(result)
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

const update = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params
    const { name, description, activated } = req.body;

    try {
        const result = await prisma.category.update({
            where: {
                category_id: parseInt(id)
            },
            data: {
                name,
                description: description,
                activated: activated,
            },
        })
        console.log(result)
        res.status(200).send(result)
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

const deleteCategory = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params

    const categoryExist = await prisma.category.findFirst({
        where: {
            category_id: parseInt(id)
        }
    })

    if (!categoryExist) return res.status(400).send("Invalid id")

    try {
        
        await prisma.categoriesOnPosts.deleteMany({
            where: {
                categoryId:parseInt(id),
            },
        })
        
        const result = await prisma.category.delete({
            where: {
                category_id: parseInt(id)
            }
        })
        console.log(result)
        res.status(200).send({message: "Successfully deleted", status: true})
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

export {
    index,
    store,
    view,
    update,
    deleteCategory
}