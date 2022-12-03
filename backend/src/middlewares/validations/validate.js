const { userSchema, connectionSchema, idSchema } = require('./schemas');

const formatError = (error) => ({
  error: error.details[0].type.endsWith('required') ? 400 : 422,
  message: error.message,
});

module.exports = {
  validateUserFields: (user) => {
    const { error } = userSchema.validate(user);

    if (error) return formatError(error);

    return { error: null };
  },

  validateConnectionFields: (conn) => {
    const { error } = connectionSchema.validate(conn);

    if (error) return formatError(error);

    return { error: null };
  },

  validateIdType: (id) => {
    const { error } = idSchema.validate({ userId: id });

    if (error) return formatError(error);

    return { error: null };
  },
};
