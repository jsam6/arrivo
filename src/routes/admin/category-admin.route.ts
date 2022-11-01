const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view, update, deleteCategory } from '../../controllers/admin/category.contoller'
import verifyTokenAdmin from '../../middlewares/VerifyTokenAdmin';

router.get('/', [verifyTokenAdmin] ,index)
router.post('/', [verifyTokenAdmin] , store)
router.get('/:id', [verifyTokenAdmin] , view)
router.put('/:id', [verifyTokenAdmin] , update)
router.delete('/:id', [verifyTokenAdmin] , deleteCategory)


export = router