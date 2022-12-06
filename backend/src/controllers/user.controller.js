const userService = require('../services/user.service');

module.exports = {
  getUsers: async (_req, res) => {
    const output = await userService.getUsers();

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

    await userService.updateUser(userId, req.body);

    return res.status(200).json(req.body);
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
