const errorMap = {
  TRAVEL_NOT_FOUND: 404,
  DRIVER_NOT_FOUND: 404,
  INVALID_FIELD: 422,
  TRAVEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
