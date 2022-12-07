const schemas = require('./schemas');

const formatError = (error) => ({
  error: error.details[0].type.endsWith('required') ? 400 : 422,
  message: error.message,
});

module.exports = {
  userFields: (user) => {
    const { error } = schemas.user.validate(user);

    if (error) return formatError(error);

    return { error: null };
  },

  userFieldsUpdate: (user) => {
    const { error } = schemas.userUpdate.validate(user);

    if (error) return formatError(error);

    return { error: null };
  },

  userFieldsPatch: (user) => {
    const { error } = schemas.userPatch.validate(user);

    if (error) return formatError(error);

    return { error: null };
  },

  connectionFields: (conn) => {
    const { error } = schemas.connection.validate(conn);

    if (error) return formatError(error);

    return { error: null };
  },

  loginFields: (login) => {
    const { error } = schemas.login.validate(login);

    if (error) return formatError(error);

    return { error: null };
  },

  idType: (id) => {
    const { error } = schemas.id.validate({ userId: id });

    if (error) return formatError(error);

    return { error: null };
  },
};
