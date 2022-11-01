const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view, update, deleteCategory } from '../../controllers/client/category.contoller'
import verifyToken from '../../middlewares/VerifyToken';

router.get('/', [verifyToken],  index)
router.post('/', [verifyToken],  store)
router.get('/:id', [verifyToken],  view)
router.put('/:id',  [verifyToken], update)
router.delete('/:id',  [verifyToken], deleteCategory)


export = router