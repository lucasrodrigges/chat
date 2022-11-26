const Joi = require('joi');

const idSchema = Joi.object({
  userId: Joi.number().min(1),
});

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  picture: Joi.string(),
});

const completUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  picture: Joi.string().required(),
});

const connectionSchema = Joi.object({
  followed: Joi.number().min(1),
});

module.exports = {
  userSchema,
  idSchema,
  completUserSchema,
  connectionSchema,
};
