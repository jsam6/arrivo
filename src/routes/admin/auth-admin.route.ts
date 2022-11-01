const express = require('express')
const router = express.Router()

import { adminLogin } from '../../controllers/admin/auth.controller'
import verifyTokenAdmin from '../../middlewares/VerifyTokenAdmin'

router.post('/', adminLogin)

export default router