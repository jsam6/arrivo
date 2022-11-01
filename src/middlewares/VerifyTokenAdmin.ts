// FORMAT OF TOKEN
// AUthorization : Bearer <access_token>

import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

function verifyTokenAdmin(req: Request, res: Response, next: NextFunction) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // check is bearer is undefined
    if ( typeof bearerHeader !== 'undefined') {
        // Split at space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[2]
        console.log(bearerToken )
        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err: Error, user: any) => {
            console.log(err)
            if (err) {
                return res.sendStatus(403);
            }

            console.log(user.user)
            // if user not admin
            if (user.user.is_admin == 0 || typeof user.user.is_admin == "undefined") {
                return res.sendStatus(403);
            }

            req.token = bearerToken
            next();
        });
    } else {
        res.sendStatus(401)
    }
}

export = verifyTokenAdmin