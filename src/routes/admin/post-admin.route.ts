const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view, update, deletePost } from '../../controllers/admin/post.contoller'
import verifyMembership from '../../middlewares/VerifyMembership';
import verifyPremium from '../../middlewares/VerifyPremium';
import verifyTokenAdmin from '../../middlewares/VerifyTokenAdmin';

router.get('/', [verifyTokenAdmin], index)

router.get('/:id', [verifyTokenAdmin], view)

router.post('/', [verifyTokenAdmin], store)

router.put('/:id', [verifyTokenAdmin], update)

router.delete('/:id', [verifyTokenAdmin], deletePost)


// // FOR TESTING JWT
// router.get('/create', (req, res, next) => {
//     verifyToken(req, res, next)
//     jwt.verify(req.token, 'secretkey', (err, authData)=> {
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