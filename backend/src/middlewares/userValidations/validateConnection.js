const { validateConnectionFields } = require('../validations/validate');

const validateConnection = (req, res, next) => {
  const { error, status } = validateConnectionFields(req.body);

  if (error) return res.status(status).json({ message: error });

  return next();
};

module.exports = validateConnection;
