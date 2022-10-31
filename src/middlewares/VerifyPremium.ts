import { NextFunction, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const jwt = require('jsonwebtoken')

async function verifyPremium(req: any, res: Response, next: NextFunction) {
    let token = jwt.decode(req.token, 'secretkey')
    let user_id = token.user.user_id

    const user = await prisma.user.findFirst({
        where: {
            user_id : user_id
        }
    })
    
    if (user && user.membership == "premium") {
        next()
    } else {
        res.sendStatus(403)
    }
}

export = verifyPremium