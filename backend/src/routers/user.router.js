const express = require('express');

const userController = require('../controllers/user.controller');
const userValidations = require('../middlewares/userValidations');
const connectionController = require('../controllers/connection.controller');

const router = express.Router();

router.get(
  '/user/',
  userValidations.validateToken,
  userController.getUsers,
);

router.get(
  '/user/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.getUserById,
);

router.get(
  '/user/:id/connections/',
  userValidations.validateToken,
  userValidations.validateId,
  connectionController.getConnections,
);

router.post(
  '/user',
  userValidations.validateUser,
  userController.createUser,
);

router.post(
  '/login',
  userValidations.validateLogin,
  userController.login,
);

router.post(
  '/user/:id/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateConnection,
  connectionController.createConnection,
);

router.put(
  '/user/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateUser,
  userController.updateUser,
); // TODO criar uma validação para todos os inputs como REQUIRED

router.patch(
  '/user/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.updateUser,
);

router.delete(
  '/user/:id',
  userValidations.validateToken,
  userValidations.validateId,
  userController.deleteUser,
);

router.delete(
  '/user/:id/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateId,
  userValidations.validateConnection,
  connectionController.deleteConnection,
);

module.exports = router;
