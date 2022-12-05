const { BaseError } = require('./errors');

module.exports = (error, req, res, next) => {
  if (error instanceof BaseError) {
    return req.status(error.statusCode).json({ message: error.message, stack: error.stack });
  }

  return req.status(500).json({ message: 'Something went wrong' });
};
