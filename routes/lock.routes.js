const Router = require('express')

const lockController = require('../controllers/lock.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { lockValidate } = require('../models/Lock')

const router = new Router()

router.post('/', lockValidate, lockController.add)

router.get('/', lockController.getAll)

router.get('/:id', lockController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), lockController.delete)

router.patch('/:id', lockValidate, lockController.update)

module.exports = router