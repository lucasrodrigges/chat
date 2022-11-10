const { mapError } = require('../utils/errorMap');

const userService = require('../services/user.service');
const userModel = require('../models/user.model');

const getAllUsers = async (req, res) => {
  const users = await userModel.findAll();

  return res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { name, password, picture } = req.body;

  const { error, message } = await userService.createUser({ name, password, picture });

  if (error) return res.status(mapError(error)).json(message);

  return res.status(201).json(message);
};

module.exports = {
  getAllUsers,
  createUser,
};
