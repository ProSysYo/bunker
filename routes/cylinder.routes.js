const Router = require('express')

const cylinderController = require('../controllers/cylinder.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { cylinderValidate } = require('../models/Cylinder')

const router = new Router()

router.post('/', cylinderValidate, cylinderController.add)

router.get('/', cylinderController.getAll)

router.get('/:id', cylinderController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), cylinderController.delete)

router.patch('/:id', cylinderValidate, cylinderController.update)

module.exports = router