const userService = require('../services/user.service');

module.exports = {
  getUser: async (req, res) => {
    const { idOrUserName } = req.params;
    const { userId } = req.headers;

    if (/\d/i.test(idOrUserName)) {
      const output = await userService.getUserById(idOrUserName);

      return res.status(200).json(output);
    }

    if (idOrUserName === 'me') {
      const output = await userService.getUserById(userId);

      return res.status(200).json(output);
    }

    const output = await userService.getUserByUserName(idOrUserName);
    return res.status(200).json(output);
  },

  getUsers: async (req, res) => {
    const { q, offset } = req.query;
    const { userId } = req.headers;
    const output = await userService.getUsers(userId, q, offset);

    return res.status(200).json(output);
  },

  getConnections: async (req, res) => {
    const { id } = req.params;
    const { t } = req.query;

    const output = await userService.getConnections(id, t);

    return res.status(200).json(output);
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const output = await userService.getUserById(id);

    return res.status(200).json(output);
  },

  getUserByUserName: async (req, res) => {
    const { userName } = req.params;
    const output = await userService.getUserByUserName(userName);

    return res.status(200).json(output);
  },

  login: async (req, res) => {
    const output = await userService.login(req.body);

    return res.status(200).json(output);
  },

  createUser: async (req, res) => {
    const output = await userService.createUser(req.body);

    return res.status(201).json(output);
  },

  createConnection: async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.headers;

    const output = await userService.createConnection(userId, Number(targetId));

    return res.status(201).json(output);
  },

  updateUser: async (req, res) => {
    const { userId } = req.headers;

    const user = await userService.updateUser(userId, req.body);

    return res.status(200).json(user);
  },

  changePassword: async (req, res) => {
    const { userId } = req.headers;

    await userService.changePassword(userId, req.body);

    return res.status(200).end();
  },

  deleteUser: async (req, res) => {
    const { userId } = req.headers;

    await userService.deleteUser(userId);

    return res.status(204).end();
  },

  deleteConnection: async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.headers;

    await userService.deleteConnection(userId, targetId);

    return res.status(204).end();
  },
};
