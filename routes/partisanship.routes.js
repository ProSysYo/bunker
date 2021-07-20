const Router = require('express')

const partisanshipController = require('../controllers/partisanship.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { partisanshipValidate } = require('../models/Partisanship')

const router = new Router()

router.post('/', partisanshipValidate, partisanshipController.add)

router.get('/', partisanshipController.getAll)

router.get('/:id', partisanshipController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), partisanshipController.delete)

router.patch('/:id', partisanshipValidate, partisanshipController.update)

module.exports = router