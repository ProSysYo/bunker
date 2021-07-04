const Router = require('express')

const typeCanvasController = require('../controllers/typeCanvas.controller')
const { typeCanvasValidate } = require('../models/typeCanvas')

const router = new Router()

router.post('/', typeCanvasValidate, typeCanvasController.add)

router.get('/', typeCanvasController.getAll)

router.get('/:id', typeCanvasController.getById)

router.delete('/:id', typeCanvasController.delete)

router.patch('/:id', typeCanvasValidate, typeCanvasController.update)

module.exports = router