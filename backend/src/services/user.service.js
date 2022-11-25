const User = require('../models/User');

module.exports = {
  getUsers: async () => {
    try {
      return { error: null, output: await User.findAll() };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createUser: async (user) => {
    try {
      return { error: null, output: await User.create(user) };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
