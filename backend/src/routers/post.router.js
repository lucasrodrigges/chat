const route = require('express').Router();

const userValidations = require('../middlewares/userValidations');
const postController = require('../controllers/post.controller');
const validateId = require('../middlewares/validateId');

route.get(
  '/post',
  postController.getPosts,
);

route.get(
  '/post/:id',
  userValidations.validateToken,
  validateId,
  postController.getPostById,
);

route.get(
  '/post/user/:id/friends',
  userValidations.validateToken,
  validateId,
  postController.getPostsByFriends,
);

route.get(
  '/post/user/:id',
  userValidations.validateToken,
  validateId,
  postController.getPostsByUser,
);

route.post(
  '/post',
  userValidations.validateToken,
  postController.createPost,
);

route.post(
  '/post/vote/:targetId',
  userValidations.validateToken,
  postController.addVote,
);

route.delete(
  '/post/:id',
  userValidations.validateToken,
  postController.deletePost,
);

module.exports = route;
