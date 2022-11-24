const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  picture: Joi.string(),
});

module.exports = {
  userSchema,
};
