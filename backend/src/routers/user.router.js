const express = require('express');

const userController = require('../controllers/user.controller');
const userValidations = require('../middlewares/userValidations');
const connectionController = require('../controllers/connection.controller');

const route = express.Router();

route.get(
  '/',
  userValidations.validateToken,
  userController.getUsers,
);

route.get(
  '/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.getUserById,
);

route.get(
  '/:id/connections/',
  userValidations.validateToken,
  userValidations.validateId,
  connectionController.getConnections,
);

route.post(
  '/',
  userValidations.validateUser,
  userController.createUser,
);

route.post(
  '/:id/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateConnection,
  connectionController.createConnection,
);

route.put(
  '/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateUser,
  userController.updateUser,
); // TODO criar uma validação para todos os inputs como REQUIRED

route.patch(
  '/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.updateUser,
);

route.delete(
  '/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.deleteUser,
);

route.delete(
  '/:id/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateConnection,
  connectionController.deleteConnection,
);

module.exports = route;
