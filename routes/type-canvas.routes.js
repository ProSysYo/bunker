const Router = require('express')

const typeCanvasController = require('../controllers/type-canvas.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { typeCanvasValidate } = require('../models/TypeCanvas')

const router = new Router()

router.post('/', typeCanvasValidate, typeCanvasController.add)

router.get('/', typeCanvasController.getAll)

router.get('/:id', typeCanvasController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), typeCanvasController.delete)

router.patch('/:id', typeCanvasValidate, typeCanvasController.update)

module.exports = router