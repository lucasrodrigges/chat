const route = require('express').Router();

const messageController = require('../controllers/message.controller');
const userValidations = require('../middlewares/userValidations');

route.post(
  '/message/:targetId',
  userValidations.validateToken,
  messageController.sendMessage,
);

module.exports = route;
