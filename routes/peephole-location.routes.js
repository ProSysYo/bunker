const Router = require('express')

const peepholeLoactionController = require('../controllers/peephole-location.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { peepholeLocationValidate } = require('../models/PeepholeLocation')

const router = new Router()

router.post('/', peepholeLocationValidate, peepholeLoactionController.add)

router.get('/', peepholeLoactionController.getAll)

router.get('/:id', peepholeLoactionController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), peepholeLoactionController.delete)

router.patch('/:id', peepholeLocationValidate, peepholeLoactionController.update)

module.exports = router