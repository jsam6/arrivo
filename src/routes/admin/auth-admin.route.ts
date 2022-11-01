const express = require('express')
const router = express.Router()

import { adminLogin } from '../../controllers/admin/auth.controller'
import verifyTokenAdmin from '../../middlewares/VerifyTokenAdmin'

router.post('/login', adminLogin)

export default router