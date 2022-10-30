import cors from 'cors'
import { Request, Response } from 'express'
import postRoute from './routes/post.route'
import authRoute from './routes/auth.route'
import categoryRoute from './routes/category.route'

const express = require('express')
const app = express()
const port = 3002



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/post', postRoute)
app.use('/category', categoryRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
