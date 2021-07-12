const Router = require('express')

const boltController = require('../controllers/bolt.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { boltValidate } = require('../models/Bolt')

const router = new Router()

router.post('/', boltValidate, boltController.add)

router.get('/', boltController.getAll)

router.get('/:id', boltController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), boltController.delete)

router.patch('/:id', boltValidate, boltController.update)

module.exports = router