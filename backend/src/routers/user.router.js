const express = require('express');

const userController = require('../controllers/user.controller');
const userValidations = require('../middlewares/userValidations');
const connectionController = require('../controllers/connection.controller');
const validateId = require('../middlewares/validateId');

const router = express.Router();

router.get(
  '/user',
  userValidations.validateToken,
  userController.getUsers,
);

router.get(
  '/user/:id',
  userValidations.validateToken,
  validateId,
  userController.getUserById,
);

router.get(
  '/user/:id/connections/',
  userValidations.validateToken,
  validateId,
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
  '/user/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateConnection,
  connectionController.createConnection,
);

router.put(
  '/user',
  userValidations.validateToken,
  userValidations.validateUser,
  userController.updateUser,
); // TODO criar uma validação para todos os inputs como REQUIRED

router.patch(
  '/user',
  userValidations.validateToken,
  userController.updateUser,
);

router.delete(
  '/user/me',
  userValidations.validateToken,
  userController.deleteUser,
);

router.delete(
  '/user/connections/:targetId',
  userValidations.validateToken,
  userValidations.validateConnection,
  connectionController.deleteConnection,
);

module.exports = router;
