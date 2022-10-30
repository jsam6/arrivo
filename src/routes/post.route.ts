const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view, update, deletePost } from '../controllers/post.contoller'
import verifyToken from '../middlewares/VerifyToken'

router.get('/', index)
router.get('/:id', view)

router.post('/', (req:any, res:any, next:any) => {
    verifyToken(req, res, next)
}, store)

router.put('/:id', (req:any, res:any, next:any) => {
    verifyToken(req, res, next)
}, update)

router.delete('/:id', (req:any, res:any, next:any) => {
    verifyToken(req, res, next)
}, deletePost)


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