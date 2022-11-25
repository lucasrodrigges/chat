const User = require('../models/User');

module.exports = {
  getConnections: async ({ id, t }) => {
    const user = await User.findByPk(id);

    if (!user) return { error: 'NOT_FOUND' };

    let result;
    try {
      switch (t) {
        case 'friend':
          result = user.getFriend(); // tem que resolver isso depois kkk;
          break;
        default:
          result = user.getFriend();
          break;
      }

      return { error: null, output: await result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createConnection: async (userId, followedId) => {
    try {
      const user = await User.findByPk(userId);
      const followed = await User.findByPk(followedId);

      if (!user || !followed) return { error: 'NOT_FOUND' };

      const result = await user.addFriend(followedId);

      return { error: null, output: result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
