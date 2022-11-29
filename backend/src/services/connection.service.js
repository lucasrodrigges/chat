const User = require('../models/User');

module.exports = {
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
