const Router = require('express')

const wrapController = require('../controllers/wrap.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { wrapValidate } = require('../models/Wrap')

const router = new Router()

router.post('/', wrapValidate, wrapController.add)

router.get('/', wrapController.getAll)

router.get('/:id', wrapController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), wrapController.delete)

router.patch('/:id', wrapValidate, wrapController.update)

module.exports = router