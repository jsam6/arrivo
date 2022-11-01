const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { makePayment, successCallback, cancelCallback } from '../../controllers/client/payment.controller';
import verifyMembership from '../../middlewares/VerifyMembership';
import verifyPremium from '../../middlewares/VerifyPremium';
import verifyToken from '../../middlewares/VerifyToken'

router.post('/', [verifyToken], makePayment)

// router.post('/billplz', [verifyToken], billPlzCallback)

router.get('/success/', [verifyToken], successCallback)
router.get('/cancel/', [verifyToken], cancelCallback)





export = router