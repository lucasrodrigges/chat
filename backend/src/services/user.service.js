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

  getConnections: async (userId, type) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found' };

      let result;
      switch (type) {
        case 'a':
          result = user.getAllFriends();
          break;
        case 'r':
          result = user.getFriendRequests();
          break;
        default:
          result = user.getReciprocalFriends();
      }

      return { error: null, output: await result };
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

  
  createConnection: async (userId, targetId) => {
    try {
      const [user, followed] = await Promise.all([userId, targetId]
        .map(async (id) => User.findByPk(id)));

      if (!user || !followed) return { error: 'NOT_FOUND', output: 'User not found' };

      const result = await user.addFriends(targetId);

      return { error: null, output: result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  updateUser: async (id, newUser) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      await user.update(newUser);

      return { error: null, output: user };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  deleteUser: async (id) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      await user.destroy();

      return { error: null };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  deleteConnection: async (userId, targetId) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found' };

      const result = await user.removeFriend(targetId);

      return { error: null, output: result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
