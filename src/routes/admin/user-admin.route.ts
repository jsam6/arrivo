const express = require('express')
const router = express.Router()

import { createUser } from '../../controllers/admin/user.controller'
import verifyTokenAdmin from '../../middlewares/VerifyTokenAdmin'

router.post('/',[verifyTokenAdmin],  createUser)

export default router