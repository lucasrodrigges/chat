const express = require('express');

const userController = require('../controllers/user.controller');
const userValidations = require('../middlewares/userValidations');

const router = express.Router();

router.get(
  '/user',
  userValidations.validateToken,
  userController.getUsers,
);

router.get(
  '/user/:idOrUserName',
  userValidations.validateToken,
  userController.getUser,
);

router.get(
  '/user/:id/connections/',
  userValidations.validateToken,
  userValidations.validateId,
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
  '/user/password',
  userValidations.validateToken,
  userValidations.validatePatchUser,
  userController.changePassword,
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
