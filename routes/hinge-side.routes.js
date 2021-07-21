const Router = require('express')

const hingeSideController = require('../controllers/hinge-side.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { hingeSideValidate } = require('../models/HingeSide')

const router = new Router()

router.post('/', hingeSideValidate, hingeSideController.add)

router.get('/', hingeSideController.getAll)

router.get('/:id', hingeSideController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), hingeSideController.delete)

router.patch('/:id', hingeSideValidate, hingeSideController.update)

module.exports = router