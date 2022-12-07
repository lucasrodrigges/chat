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

  userUpdate: Joi.object({
    name: Joi.string().min(3),
    userName: Joi.string().min(3),
    email: Joi.string().email(),
    picture: Joi.string(),
  }).min(1),

  connection: Joi.object({
    targetId: Joi.number().min(1),
  }),

  login: Joi.object({
    email: Joi.string().email(),
    userName: Joi.alternatives().conditional(
      'email',
      { is: Joi.exist(), then: Joi.string(), otherwise: Joi.string().required() },
    ),
    password: Joi.string().min(8).required(),
  }),
};
