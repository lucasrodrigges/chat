const express = require('express');
const userDB = require('../db/userDB');

const { validateNewUser } = require('../utils/validations');

const route = express.Router();

route.get('/', async (req, res) => {
  const [users] = await userDB.getUsers();

  res.status(200).json(users);
});

route.post('/', validateNewUser, (req, res) => {
  userDB.addUser(req.body);

  res.status(200).end();
});

module.exports = route;
