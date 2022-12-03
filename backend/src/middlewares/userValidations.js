const { validateUserFields, validateConnectionFields, validateIdType } = require('./validations/validate');
const { validateToken } = require('../auth/token');

module.exports = {
  validateUser: (req, res, next) => {
    const { error, message } = validateUserFields(req.body);

    if (error) return res.status(error).json({ message });

    return next();
  },

  validateConnection: (req, res, next) => {
    const { targetId } = req.params;
    const { error, message } = validateConnectionFields({ targetId });

    if (error) return res.status(error).json({ message });

    return next();
  },

  validateId: (req, res, next) => {
    const { id } = req.params;
    const { error, message } = validateIdType(id);

    if (error) return res.status(error).json({ message });

    return next();
  },

  validateToken: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const { error, id } = validateToken(authorization);

    if (error) return res.status(401).json({ message: 'Expired or invalid token' });

    req.headers.userId = id;

    return next();
  },
};
