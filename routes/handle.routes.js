const Router = require('express')

const handleController = require('../controllers/handle.controller')
const { handleValidate } = require('../models/Handle')

const router = new Router()

router.post('/', handleValidate, handleController.add)

router.get('/', handleController.getAll)

router.get('/:id', handleController.getById)

router.delete('/:id', handleController.delete)

router.patch('/:id', handleValidate, handleController.update)

module.exports = router