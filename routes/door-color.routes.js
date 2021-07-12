const Router = require('express')

const doorColorController = require('../controllers/door-color.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { doorColorValidate } = require('../models/DoorColor')

const router = new Router()

router.post('/', doorColorValidate, doorColorController.add)

router.get('/', doorColorController.getAll)

router.get('/:id', doorColorController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), doorColorController.delete)

router.patch('/:id', doorColorValidate, doorColorController.update)

module.exports = router