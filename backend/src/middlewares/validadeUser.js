const { validateUserFields } = require('./validations/validate');

const validateUser = (req, res, next) => {
  const { error, status } = validateUserFields(req.body);

  if (error) return res.status(status).json({ message: error });

  return next();
};

module.exports = validateUser;
