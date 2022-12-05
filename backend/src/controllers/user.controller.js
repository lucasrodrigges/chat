const userService = require('../services/user.service');
const mapStatus = require('../utils/mapStatus');

module.exports = {
  getUsers: async (_req, res) => {
    const { error, output } = await userService.getUsers();

    if (error) return res.status(mapStatus(error)).end();

    return res.status(200).json(output);
  },

  getConnections: async (req, res) => {
    const { id } = req.params;
    const { t } = req.query;

    const { error, output } = await userService.getConnections(id, t);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const { error, output } = await userService.getUserById(id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  login: async (req, res) => {
    const { error, output } = await userService.login(req.body);

    if (error) return res.status(mapStatus(error)).json({ message: output });

    return res.status(200).json(output);
  },

  createUser: async (req, res) => {
    const { error, output } = await userService.createUser(req.body);

    if (error) return res.status(mapStatus(error)).json({ message: output });

    return res.status(201).json(output);
  },

  createConnection: async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.headers;

    const { error, output } = await userService.createConnection(userId, targetId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(201).json(output);
  },

  updateUser: async (req, res) => {
    const { userId } = req.headers;

    const { error, output } = await userService.updateUser(userId, req.body);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });
    return res.status(200).json(output);
  },

  deleteUser: async (req, res) => {
    const { userId } = req.headers;

    const { error, output } = await userService.deleteUser(userId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(204).end();
  },

  deleteConnection: async (req, res) => {
    const { targetId } = req.params;
    const { userId } = req.headers;

    const { error, output } = await userService.deleteConnection(userId, targetId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(204).end();
  },
};
