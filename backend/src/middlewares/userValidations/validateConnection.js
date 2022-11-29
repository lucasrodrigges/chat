const { validateConnectionFields } = require('../validations/validate');

const validateConnection = (req, res, next) => {
  const { targetId } = req.params;
  const { error, status } = validateConnectionFields({ targetId });

  if (error) return res.status(status).json({ message: error });

  return next();
};

module.exports = validateConnection;
