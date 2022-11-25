const { validateIdType } = require('./validations/validate');

const validateId = (req, res, next) => {
  const { id } = req.params;
  const { error, status } = validateIdType(id);

  if (error) return res.status(status).json({ message: error });

  return next();
};

module.exports = validateId;
