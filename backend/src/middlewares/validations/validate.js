const { userSchema, idSchema } = require('./schemas');

const formatError = (error) => ({
  error: error.message,
  status: error.details[0].type.endsWith('required') ? 400 : 422,
});

const validateIdType = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return formatError(error);

  return { error: null };
};

const validateUserFields = (user) => {
  const { error } = userSchema.validate(user);

  if (error) return formatError(error);

  return { error: null };
};

module.exports = {
  validateUserFields,
  validateIdType,
};
