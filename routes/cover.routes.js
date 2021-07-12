const Router = require('express')

const coverController = require('../controllers/cover.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { coverValidate } = require('../models/Cover')

const router = new Router()

router.post('/', coverValidate, coverController.add)

router.get('/', coverController.getAll)

router.get('/:id', coverController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), coverController.delete)

router.patch('/:id', coverValidate, coverController.update)

module.exports = router