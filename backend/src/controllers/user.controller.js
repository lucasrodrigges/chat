const mapError = require('../utils/mapError');
const userService = require('../services/user.service');

module.exports = {
  getUsers: async (_req, res) => {
    const { error, output } = await userService.getUsers();

    if (error) return res.status(mapError(error)).json({ message: output });

    return res.status(200).json(output);
  },

  createUser: async (req, res) => {
    const { name, password, picture } = req.body;
    const { error, output } = await userService.createUser({ name, password, picture });

    if (error) return res.status(mapError(error)).json({ message: output });

    return res.status(201).json(output);
  },
};
