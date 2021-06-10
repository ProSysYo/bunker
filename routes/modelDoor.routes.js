const Router = require('express')

const modelDoorController = require('../controllers/modelDoor.controller')
const { modelDoorValidate } = require('../models/ModelDoor')

const router = new Router()

router.post('/', modelDoorValidate, modelDoorController.addModel)

router.get('/', modelDoorController.getModels)

router.get('/:id', modelDoorController.getById)

router.delete('/:id', modelDoorController.delete)

router.patch('/:id', modelDoorValidate, modelDoorController.update)

module.exports = router