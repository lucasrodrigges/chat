const userService = require('../services/user.service');
const mapStatus = require('../utils/mapStatus');

module.exports = {
  getUsers: async (_req, res) => {
    const { error, output } = await userService.getUsers();

    if (error) return res.status(mapStatus(error)).end();

    return res.status(200).json(output);
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const { error, output } = await userService.getUserById(id);

    if (error) return res.status(mapStatus(error)).end();

    return res.status(200).json(output);
  },

  createUser: async (req, res) => {
    const { name, password, picture } = req.body;
    const { error, output } = await userService.createUser({ name, password, picture });

    if (error) return res.status(mapStatus(error)).end();

    return res.status(201).json(output);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    const { error } = await userService.deleteUser(id);

    if (error) return res.status(mapStatus(error)).end();

    return res.status(204).end();
  },
};
