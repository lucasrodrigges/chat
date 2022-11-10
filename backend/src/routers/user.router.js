const express = require('express');

const userController = require('../controllers/user.controller');

const route = express.Router();

route.get('/', userController.getAllUsers);

route.post('/', userController.createUser);

module.exports = route;
