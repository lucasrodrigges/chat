const { validateToken } = require('../auth/token');

module.exports = {
  validateToken: (socket, next) => {
    const { token } = socket.handshake.auth;

    if (!token) return next(new Error('Token not found'));

    const { error, id } = validateToken(token);

    if (error) return next(new Error('Expired or invalid token'));

    socket.handshake.userId = id;

    return next();
  },
};
