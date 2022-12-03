const errorsList = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

const mapStatus = (error) => (
  errorsList[error] || 500
);

module.exports = mapStatus;
