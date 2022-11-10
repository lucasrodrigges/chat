const { validateNewUser } = require('./validations/validate');

const userModel = require('../models/user.model');

const createUser = async (user) => {
  const validation = validateNewUser(user);

  if (validation.error) return validation;

  const message = await userModel.insert(user);

  return { message };
};

module.exports = {
  createUser,
};
