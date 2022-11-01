const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, storeNormal, storePremium, view, update, deletePost } from '../../controllers/client/post.contoller'
import verifyMembership from '../../middlewares/VerifyMembership';
import verifyPremium from '../../middlewares/VerifyPremium';
import verifyToken from '../../middlewares/VerifyToken'

router.get('/', [verifyToken], index)

router.get('/:id', [verifyToken], view)

router.post('/normal', [verifyToken, verifyMembership], storeNormal)
router.post('/premium', [verifyToken, verifyPremium], storePremium)

router.put('/:id', [verifyToken, verifyMembership], update)

router.delete('/:id', [verifyToken], deletePost)


// // FOR TESTING JWT
// router.get('/create', (req, res, next) => {
//     verifyToken(req, res, next)
//     jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData)=> {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 message: 'Post Created..',
//                 user: authData
//             })
//         }
//     })
//     next()
//   }, (req, res, next) => {
//     console.log('Request Type:', req.method)
//     next()
//   })



export = router