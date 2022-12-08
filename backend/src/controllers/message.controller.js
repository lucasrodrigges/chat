const messageService = require('../services/message.service');

module.exports = {
  sendMessage: async (req, res) => {
    const { userId } = req.headers;
    const { targetId } = req.params;

    await messageService.sendMessage(userId, { receiver: targetId, ...req.body });

    res.status(201).end();
  },
};
