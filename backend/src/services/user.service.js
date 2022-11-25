const User = require('../models/User');

module.exports = {
  getUsers: async () => {
    try {
      const user = await User.findByPk(1);
      const res = user.getUser();

      return { error: null, output: res };
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
