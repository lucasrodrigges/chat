const { HttpError } = require('./errors');

module.exports = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.log(error);
  return res.status(500).json({ message: 'Something went wrong' });
};
