import { NextFunction, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const jwt = require('jsonwebtoken')

async function  verifyMembership(req: any, res: Response, next: NextFunction) {
    let token = jwt.decode(req.token, process.env.JWT_SECRET_KEY)
    let user_id = token.user.user_id

    const user = await prisma.user.findFirst({
        where: {
            user_id : user_id
        }
    })

    
    if (user && user.membership == "normal") {
        next()
    } else {
        res.sendStatus(403)
    }
}

export = verifyMembership