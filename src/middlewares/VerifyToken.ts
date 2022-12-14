// FORMAT OF TOKEN
// AUthorization : Bearer <access_token>

import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

function verifyToken(req: Request, res: Response, next: NextFunction) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    // check is bearer is undefined
    if ( typeof bearerHeader !== 'undefined') {
        // Split at space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[2]

        jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err: Error, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            
            // if user is admin
            if (user.user.is_admin == 1 || typeof user.user.is_admin == "undefined") {
                return res.sendStatus(403);
            }

            // req.user = user;
            req.token = bearerToken
            next();
        });
    } else {
        res.sendStatus(401)
    }
}

export = verifyToken