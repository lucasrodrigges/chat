const express = require('express');

const userController = require('../controllers/user.controller');
const connectionController = require('../controllers/connection.controller');

const validateUser = require('../middlewares/userValidations/validadeUser');
const validateConnection = require('../middlewares/userValidations/validateConnection');
const validateId = require('../middlewares/userValidations/validateId');

const route = express.Router();

route.get('/', userController.getUsers);

route.get('/:id', validateId, userController.getUserById);

route.post('/', validateUser, userController.createUser);

route.patch('/:id', validateId, userController.updateUser);

route.put('/:id', validateId, userController.updateUser); // TODO criar uma validação para todos os inputs como REQUIRED

route.delete('/:id', validateId, userController.deleteUser);

route.get('/:id/connections', validateId, connectionController.getConnections);

route.post('/:id/connections', validateId, validateConnection, connectionController.createConnection);

module.exports = route;
