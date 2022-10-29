import cors from 'cors'
import { Request, Response } from 'express'
const express = require('express')
const app = express()
const port = 3002



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
})
// app.use('/post', postRoute)
// app.use('/game', gameRoute)
// app.use('/region', regionRoute)
// app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
