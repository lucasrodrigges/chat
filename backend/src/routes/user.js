const express = require('express');
const userModel = require('../model/user.model');

const { validateNewUser } = require('../utils/validations');

const route = express.Router();

route.get('/', async (req, res) => {
  const [users] = await userModel.findAll();

  res.status(200).json(users);
});

route.post('/', validateNewUser, (req, res) => {
  userModel.addUser(req.body);

  res.status(200).end();
});

module.exports = route;
