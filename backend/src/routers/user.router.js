const express = require('express');

const userController = require('../controllers/user.controller');

const route = express.Router();

route.get('/', userController.getUsers);

route.post('/', userController.createUser);

module.exports = route;
