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
    let token = jwt.decode(req.token, process.env.JWT_SECRET_KEY)

    const userExist = await prisma.user.findFirst({
        where: {
            user_id: token.user.user_id
        }
    })
    if (!userExist) return res.status(400).send("Invalid user")

    try {
        const result = await prisma.post.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                user: {
                    select: {
                        user_id: true,
                        username: true
                    }
                }
            },
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
    const { title, body, status, label, category_id } = req.body;

    const categoryExist = await prisma.category.findFirst({
        where: {
            category_id: category_id
        }
    })

    if (!categoryExist) return res.status(400).send("Invalid category_id")
    if (!["draft", "published", "pending_review"].includes(status)) return res.status(400).send("Invalid status")
    if (!["normal", "premium"].includes(label)) return res.status(400).send("Invalid label")

    const userExist = await prisma.user.findFirst({
        where: {
            user_id: token.user.user_id
        }
    })
    if (!userExist) return res.status(400).send("Invalid user")

    try {
        const result =  await prisma.post.create({
            data: {
                title: title,
                body: body,
                status: status,
                label: label,
                categories: {
                    create: [
                        {
                            createdAt: new Date(),
                          category: {
                            connect: {
                              category_id: category_id,
                            },
                          },
                        }
                    ],
                },
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
                categories: {
                    include: {
                        category: true
                    }
                },
                user: {
                    select: {
                        user_id: true,
                        username: true
                    }
                }
            },
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

    const { title, body, status, label, category_id } = req.body;
    
    const postExist = await prisma.post.findFirst({
        where: {
            post_id: parseInt(id)
        }
    })
    if (!postExist) return res.status(400).send("Invalid post_id")

    const categoryExist = await prisma.category.findFirst({
        where: {
            category_id: category_id
        }
    })

    if (!categoryExist) return res.status(400).send("Invalid category_id")
    if (!["draft", "published", "pending_review"].includes(status)) return res.status(400).send("Invalid status")
    if (!["normal", "premium"].includes(label)) return res.status(400).send("Invalid label")

    try {
        await prisma.categoriesOnPosts.deleteMany({
            where: {
                postId:parseInt(id),
                categoryId: parseInt(category_id),
            },
        });


        const result = await prisma.post.update({
            where: {
                post_id: parseInt(id)
            },
            data: {
                title: title,
                body: body,
                status: status,
                label: label,
                categories: {
                    create: [
                        {
                            createdAt: new Date(),
                            category: {
                                connect: {
                                    category_id: category_id,
                                },
                            },
                        }
                    ],
                },
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

const deletePost = async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params

    const postExist = await prisma.post.findFirst({
        where: {
            post_id: parseInt(id)
        }
    })

    if (!postExist) return res.status(400).send("Invalid id")

    try {
        await prisma.categoriesOnPosts.deleteMany({
            where: {
                postId:parseInt(id),
            },
        })

        const result = await prisma.post.delete({
            where: {
                post_id: parseInt(id)
            }
        })
        res.status(200).send({message: "successfully deleted", status: true})
        next()
    } catch(e:unknown) {
        console.log(e)
        res.sendStatus(500)
    }
}

export {
    index, store, view, update, deletePost
}