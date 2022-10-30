const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');

import { index, store, view, update, deleteCategory } from '../controllers/category.contoller'

router.get('/', index)
router.post('/', store)
router.get('/:id', view)
router.put('/:id', update)
router.delete('/:id', deleteCategory)


export = router