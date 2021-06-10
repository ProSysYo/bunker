const Router = require('express')

const Controller = require('../controllers/ControllerTamplate')
const { modelDoorValidate } = require('../models/ModelDoor')

const router = new Router()

router.post('/', modelDoorValidate, Controller.add)

router.get('/', Controller.getAll)

router.get('/:id', Controller.getById)

router.delete('/:id', Controller.delete)

router.patch('/:id', Controller.update)

module.exports = router