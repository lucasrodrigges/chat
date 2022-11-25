const Joi = require('joi');

const idSchema = Joi.number().integer().min(1);

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  picture: Joi.string(),
});

module.exports = {
  userSchema,
  idSchema,
};
