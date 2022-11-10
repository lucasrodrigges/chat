const { validateNewUser } = require('./validations/validate');

const userModel = require('../models/user.model');

const createUser = async (user) => {
  const validation = validateNewUser(user);

  if (validation.error) return validation;
  return userModel.insert(user);
};

module.exports = {
  createUser,
};
