const Router = require('express')

const peepholeController = require('../controllers/peephole.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { peepholeValidate } = require('../models/Peephole')

const router = new Router()

router.post('/', peepholeValidate, peepholeController.add)

router.get('/', peepholeController.getAll)

router.get('/:id', peepholeController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), peepholeController.delete)

router.patch('/:id', peepholeValidate, peepholeController.update)

module.exports = router