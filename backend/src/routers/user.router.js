const express = require('express');

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validadeUser');
const validateId = require('../middlewares/validateId');

const route = express.Router();

route.get('/', userController.getUsers);

route.get('/:id', validateId, userController.getUserById);

route.post('/', validateUser, userController.createUser);

route.delete('/:id', validateId, userController.deleteUser);

module.exports = route;
