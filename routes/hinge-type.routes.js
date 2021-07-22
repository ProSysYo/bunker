const Router = require('express')

const hingeTypeController = require('../controllers/hinge-type.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { hingeTypeValidate } = require('../models/HingeType')

const router = new Router()

router.post('/', hingeTypeValidate, hingeTypeController.add)

router.get('/', hingeTypeController.getAll)

router.get('/:id', hingeTypeController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), hingeTypeController.delete)

router.patch('/:id', hingeTypeValidate, hingeTypeController.update)

module.exports = router