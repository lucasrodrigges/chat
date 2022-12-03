const validations = require('./validations/validate');

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (id === 'me') req.params.id = req.headers.userId;

  else {
    const { error, message } = validations.idType(id);

    if (error) return res.status(error).json({ message });
  }

  return next();
};
