const { userSchema } = require('./schemas');

const formatError = (error) => ({
  error: error.message,
  status: error.details[0].type.endsWith('required') ? 400 : 422,
});

const validateUserFields = (user) => {
  const { error } = userSchema.validate(user);

  if (error) return formatError(error);

  return { error: null };
};

module.exports = {
  validateUserFields,
};
