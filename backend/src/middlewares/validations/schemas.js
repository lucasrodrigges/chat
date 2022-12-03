const Joi = require('joi');

module.exports = {
  id: Joi.object({
    userId: Joi.number().min(1),
  }),

  user: Joi.object({
    name: Joi.string().min(3).required(),
    userName: Joi.string().min(3),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    picture: Joi.string(),
  }),

  connection: Joi.object({
    targetId: Joi.number().min(1),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
