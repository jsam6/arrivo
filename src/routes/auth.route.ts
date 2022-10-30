const express = require('express')
const router = express.Router()

import { login, registerUser } from '../controllers/auth.controller'

router.post('/login', login)
router.post('/register', registerUser)

export default router