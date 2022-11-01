import cors from 'cors'
import { Request, Response } from 'express'

import adminAuthRoute from './routes/admin/auth-admin.route'
import userRoute from './routes/admin/user-admin.route'
import adminCategoryRoute from './routes/admin/category-admin.route'
import adminPostRoute from './routes/admin/post-admin.route'

import postRoute from './routes/client/post.route'
import authRoute from './routes/client/auth.route'
import categoryRoute from './routes/client/category.route'

const express = require('express')
const app = express()
const port = 3002



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// admin
app.use('/admin/auth', adminAuthRoute)
app.use('/admin/user', userRoute)
app.use('/admin/category', adminCategoryRoute)
app.use('/admin/post', adminPostRoute)



// client
app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use('/category', categoryRoute)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
