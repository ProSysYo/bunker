const Router = require('express')

const peepholeLocationController = require('../controllers/peephole-location.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { peepholeLocationValidate } = require('../models/PeepholeLocation')

const router = new Router()

router.post('/', peepholeLocationValidate, peepholeLocationController.add)

router.get('/', peepholeLocationController.getAll)

router.get('/:id', peepholeLocationController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), peepholeLocationController.delete)

router.patch('/:id', peepholeLocationValidate, peepholeLocationController.update)

module.exports = router