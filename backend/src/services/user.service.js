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
  getUserById: async (id) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      return { error: null, output: user };
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

  updateUser: async (id, { name, password, picture }) => {
    const user = await User.findByPk(id);

    if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

    await User.update({ name, password, picture }, { where: { id } });

    return { error: null, output: await User.findByPk(id) };
  },

  deleteUser: async (id) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      await User.destroy({ where: { id } });

      return { error: null };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
