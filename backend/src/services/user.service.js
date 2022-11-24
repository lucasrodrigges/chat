const userModel = require('../models/user.model');

module.exports = {
  getUsers: async () => {
    try {
      return { error: null, output: await userModel.findAll() };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createUser: async (user) => {
    try {
      return { error: null, output: await userModel.crefate(user) };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
