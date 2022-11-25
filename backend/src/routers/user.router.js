const express = require('express');

const userController = require('../controllers/user.controller');
const connectionController = require('../controllers/connection.controller');

const validateUser = require('../middlewares/userValidations/validadeUser');
const validateId = require('../middlewares/userValidations/validateId');

const route = express.Router();

route.get('/', userController.getUsers);

route.get('/:id', validateId, userController.getUserById);

route.post('/', validateUser, userController.createUser);

route.patch('/:id', validateId, userController.updateUser);

route.put('/:id', validateId, userController.updateUser); // TODO criar uma validação para todos os inputs como REQUIRED

route.delete('/:id', validateId, userController.deleteUser);

route.get('/:id/connections', connectionController.getConnections);

route.post('/:id/connections', connectionController.createConnection);

module.exports = route;
