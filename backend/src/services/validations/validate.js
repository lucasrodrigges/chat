const { addUserSchema } = require('./schemas');

const validateNewUser = (user) => {
  const { error } = addUserSchema.validate(user);
  if (error) return { error: 'INVALID_FIELD', message: error.message };

  return { error: null, message: '' };
};

module.exports = {
  validateNewUser,
};
