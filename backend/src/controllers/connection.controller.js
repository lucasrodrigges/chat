const connectionService = require('../services/connection.service');
const mapStatus = require('../utils/mapStatus');

module.exports = {
  getConnections: async (req, res) => {
    const { t } = req.query;
    const { id } = req.params;

    const { error, output } = await connectionService.getConnections({ id, t });

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  createConnection: async (req, res) => {
    const { id } = req.params;
    const { f } = req.query;

    const { error, output } = await connectionService.createConnection(id, Number(f));

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(201).json(output);
  },
};
