const User = require('../models/User');

const { HttpError } = require('../utils/errors');
const { createToken } = require('../auth/token');

module.exports = {
  getUsers: async () => User.findAll(),

  getUserById: async (id) => {
    const user = await User.findByPk(id);

    if (!user) throw new HttpError(404, 'User not found');

    return user;
  },

  getConnections: async (userId, type) => {
    const user = await User.findByPk(userId);

    if (!user) throw new HttpError(404, 'User not found');

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

    return result;
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new HttpError(404, 'User not found');
    if (user.password !== password) {
      throw new HttpError(401, 'Wrong password');
    }

    return { token: createToken({ id: user.id }) };
  },

  createUser: async (newUser) => {
    const [user, created] = await User.findOrCreate({
      where: { email: newUser.email },
      defaults: newUser,
    });

    if (!created) throw new HttpError(409, 'Email already registered');

    return { token: createToken({ id: user.id }) };
  },

  createConnection: async (userId, targetId) => {
    const [user, followed] = await Promise.all([userId, targetId]
      .map(async (id) => User.findByPk(id)));

    if (!user || !followed) throw new HttpError(404, 'User not found');

    return user.addFriends(targetId);
  },

  updateUser: async (id, newUser) => {
    const user = await User.findByPk(id);

    if (!user) throw new HttpError(404, 'User not found');

    return user.update(newUser);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);

    if (!user) throw new HttpError(404, 'User not found');

    await user.destroy();
  },

  deleteConnection: async (userId, targetId) => {
    const user = await User.findByPk(userId);

    if (!user) throw new HttpError(404, 'User not found');

    return user.removeFriend(targetId);
  },
};
