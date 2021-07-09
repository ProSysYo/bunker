const Router = require('express')

const cylinderController = require('../controllers/cylinder.controller')
const { cylinderValidate } = require('../models/Cylinder')

const router = new Router()

router.post('/', cylinderValidate, cylinderController.add)

router.get('/', cylinderController.getAll)

router.get('/:id', cylinderController.getById)

router.delete('/:id', cylinderController.delete)

router.patch('/:id', cylinderValidate, cylinderController.update)

module.exports = router