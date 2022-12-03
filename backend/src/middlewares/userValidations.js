const { validateUserFields, validateConnectionFields, validateIdType } = require('./validations/validate');

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
};
