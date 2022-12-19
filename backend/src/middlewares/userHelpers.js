const { validateToken } = require('../auth/token');

module.exports = {
  saveUserId: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return next();

    const { error, id } = validateToken(authorization);

    if (!error) req.headers.userId = id;

    return next();
  },
};
