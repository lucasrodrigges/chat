const express = require('express');

const userController = require('../controllers/user.controller');
const connectionController = require('../controllers/connection.controller');

const validateUser = require('../middlewares/validadeUser');

const route = express.Router();

route.get('/', userController.getUsers);

route.post('/', validateUser, userController.createUser);

route.get('/:id/connections', connectionController.getConnections);

route.post('/:id/connections', connectionController.createConnection);

module.exports = route;
