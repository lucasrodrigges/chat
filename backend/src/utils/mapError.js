const errorList = {
  USER_NOT_FOUND: 404,
  INVALID_FIELD: 422,
};

const mapError = (type) => errorList[type] || 500;

module.exports = mapError;
