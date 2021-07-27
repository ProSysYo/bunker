const Router = require('express')

const packagingController = require('../controllers/packaging.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { packagingValidate } = require('../models/Packaging')

const router = new Router()

router.post('/', packagingValidate, packagingController.add)

router.get('/', packagingController.getAll)

router.get('/:id', packagingController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), packagingController.delete)

router.patch('/:id', packagingValidate, packagingController.update)

module.exports = router