const { validateNewUser } = require('./validations/validate');

const userModel = require('../models/user.model');

module.exports = {
  getUsers: async () => {
    try {
      return { error: null, output: await userModel.findAll() };
    } catch (error) {
      return { error };
    }
  },

  createUser: async (user) => {
    const validation = validateNewUser(user);

    if (validation.error) return validation;

    try {
      return { error: null, output: await userModel.create(user) };
    } catch (error) {
      return { error };
    }
  },
};
