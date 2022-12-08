const { getSocketById } = require('../functions/user');
const { sendMessage } = require('../../services/message.service');

module.exports = {
  create: (socket, data) => {
    const { targetId } = data;
    const { userId } = socket.handshake;
    const socketId = getSocketById(targetId);

    if (socketId) socket.to(socketId).emit('private message', data.message);

    sendMessage(userId, targetId, data.message);
  },
};
