const User = require('../models/User');
const { createToken } = require('../auth/token');

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

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return { error: 'NOT_FOUND', output: 'User not found' };

      if (user.password !== password) {
        return { error: 'UNAUTHORIZED', output: 'Wrong password' };
      }

      const output = { token: createToken({ id: user.id }) };

      return { error: null, output };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createUser: async (newUser) => {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: newUser.email },
        defaults: newUser,
      });

      if (!created) return { error: 'CONFLICT', output: 'This email is already registered' };

      const output = { token: createToken({ id: user.id }) };

      return { error: null, output };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  updateUser: async (id, newUser) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      await User.update(newUser, { where: { id } });

      return { error: null, output: await User.findByPk(id) };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
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
