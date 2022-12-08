const socketio = require('socket.io');
const { privateMessage } = require('./events');

const { validateToken } = require('../middlewares/socketValidations');
const { setOnline, setOffline } = require('./functions/user');

const configIo = (server) => {
  const io = new socketio.Server(server, {
    cors: {
      origin: process.env.ORIGIN || 'http://127.0.0.1:5500',
      credentials: true,
    },
  });

  io.use(validateToken);

  io.on('connection', (socket) => {
    setOnline(socket);

    socket.on('private message', (data) => privateMessage.create(socket, data));

    socket.on('disconnect', () => setOffline(socket));
  });
};

module.exports = configIo;
