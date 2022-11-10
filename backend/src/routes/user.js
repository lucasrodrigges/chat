const express = require('express');

const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const route = express.Router();

route.get('/', async (req, res) => {
  const users = await userModel.findAll();

  return res.status(200).json({ users });
});

route.post('/', async (req, res) => {
  const { name, password, picture } = req.body;

  const output = await userService.createUser({ name, password, picture });

  if (output.error) return res.status(400).json(output);
  return res.status(200).json({ insertId: output });
});

module.exports = route;
