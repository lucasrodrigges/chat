const User = require('../models/User');

module.exports = {
  getConnections: async ({ id, t }) => {
    try {
      const user = await User.findByPk(id);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found' };

      let result;
      if (t === 'f') result = user.getReciprocalFriends();
      else result = user.getFriends();

      return { error: null, output: await result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createConnection: async (userId, followedId) => {
    try {
      const [user, followed] = await Promise.all([userId, followedId]
        .map(async (id) => User.findByPk(id)));

      if (!user || !followed) return { error: 'NOT_FOUND', output: 'User not found' };

      const result = await user.addFriends(followedId);

      return { error: null, output: result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
