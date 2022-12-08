const socketio = require('socket.io');
const events = require('./events');

const { validateToken } = require('../middlewares/socketValidations');

const configIo = (server) => {
  const io = new socketio.Server(server, {
    cors: {
      origin: process.env.ORIGIN || 'http://127.0.0.1:5500',
      credentials: true,
    },
  });

  io.use(validateToken);

  io.on('connection', (socket) => {
    console.log(`${socket.handshake.userId} is logged with id ${socket.id}`);

    socket.on('private message', events.privateMessage);
  });
};

module.exports = configIo;
