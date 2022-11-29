const connectionService = require('../services/connection.service');
const mapStatus = require('../utils/mapStatus');

module.exports = {
  getConnections: async (req, res) => {
    const { id } = req.params;
    const { t } = req.query;

    const { error, output } = await connectionService.getConnections(id, t);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  createConnection: async (req, res) => {
    const { id, targetId } = req.params;

    const { error, output } = await connectionService.createConnection(id, targetId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(201).json(output);
  },

  deleteConnection: async (req, res) => {
    const { id, targetId } = req.params;

    const { error, output } = await connectionService.deleteConnection(id, targetId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(204).end();
  },
};
