const errorsList = {
  NOT_FOUND: 404,
};

const mapStatus = (error) => (
  errorsList[error] || 500
);

module.exports = mapStatus;
