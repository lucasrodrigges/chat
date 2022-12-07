const express = require('express');

const userController = require('../controllers/user.controller');
const userValidations = require('../middlewares/userValidations');
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
  userController.getConnections,
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
  userController.createConnection,
);

router.put(
  '/user',
  userValidations.validateToken,
  userValidations.validateUpdateUser,
  userController.updateUser,
);

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
  userController.deleteConnection,
);

module.exports = router;
