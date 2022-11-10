const express = require('express');

const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const route = express.Router();

route.get('/', async (req, res) => {
  const [users] = await userModel.findAll();

  res.status(200).json({ users });
});

route.post('/', async (req, res) => {
  const { name, password, picture } = req.body;

  const insertId = await userService.createUser({ name, password, picture });
  res.status(200).json({ insertId });
});

module.exports = route;
