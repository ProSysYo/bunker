const Router = require('express')

const typePanelController = require('../controllers/type-panel.controller')
const roleMiddleware = require('../middleware/role.middleware')
const { typePanelValidate } = require('../models/TypePanel')

const router = new Router()

router.post('/', typePanelValidate, typePanelController.add)

router.get('/', typePanelController.getAll)

router.get('/:id', typePanelController.getById)

router.delete('/:id', roleMiddleware(["ADMIN"]), typePanelController.delete)

router.patch('/:id', typePanelValidate, typePanelController.update)

module.exports = router