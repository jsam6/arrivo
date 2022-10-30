// FORMAT OF TOKEN
// AUthorization : Bearer <access_token>

import { NextFunction, Request, Response } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // check is bearer is undefined
    if ( typeof bearerHeader !== 'undefined') {
        // Split at space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        req.token = bearerToken
        next();
    } else {
        //forbidden
        res.sendStatus(403)
    }
}

export = verifyToken