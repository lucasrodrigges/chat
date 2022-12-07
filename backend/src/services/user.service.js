const { or } = require('sequelize').Op;
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const User = require('../models/User');

const { HttpError } = require('../utils/errors');
const jwt = require('../auth/token');

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

  login: async ({ email = '', userName = '', password }) => {
    const user = await User.findOne({
      where: {
        [or]: [
          { email }, { userName },
        ],
      },
    });

    if (!user || !compareSync(password, user.password)) {
      throw new HttpError(404, 'Incorrect username/email or password');
    }

    return { token: jwt.createToken({ id: user.id }) };
  },

  createUser: async ({ password, ...newUser }) => {
    const [user, created] = await User.findOrCreate({
      where: {
        [or]: [
          { email: newUser.email },
          { user_name: newUser.userName },
        ],
      },
      defaults: {
        password: hashSync(password, genSaltSync(10)),
        ...newUser,
      },
    });

    if (created) return { token: jwt.createToken({ id: user.id }) };

    if (user.email === newUser.email) {
      throw new HttpError(409, 'Email already registered');
    }

    throw new HttpError(409, 'User name is already in use');
  },

  createConnection: async (userId, targetId) => {
    const [user, followed] = await Promise.all([userId, targetId]
      .map(async (id) => User.findByPk(id)));

    if (!user || !followed) throw new HttpError(404, 'User not found');
    if (await user.hasFriend(targetId)) throw new HttpError(409, 'Already friends');

    return user.addFriends(targetId);
  },

  updateUser: async (id, newUser) => {
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!user) throw new HttpError(404, 'User not found.');

    user.update(newUser);

    return user;
  },

  deleteUser: async (id) => {
    const deleted = await User.destroy({ where: { id } });

    if (!deleted) throw new HttpError(404, 'User not found');
  },

  deleteConnection: async (userId, targetId) => {
    const user = await User.findByPk(userId);

    if (!user) throw new HttpError(404, 'User not found');

    return user.removeFriend(targetId);
  },
};
