const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view } from '../controllers/category.contoller'

router.get('/', index)
router.post('/', store)
router.get('/:id', view)


export = router