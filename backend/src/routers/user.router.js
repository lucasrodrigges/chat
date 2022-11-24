const express = require('express');

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validadeUser');

const route = express.Router();

route.get('/', userController.getUsers);

route.post('/', validateUser, userController.createUser);

module.exports = route;
