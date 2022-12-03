const route = require('express').Router();

const userValidations = require('../auth/token');
const postController = require('../controllers/post.controller');

route.get(
  '/',
  userValidations.validateToken,
  postController.getPosts,
);

route.get(
  '/:id',
  userValidations.validateToken,
  postController.getPostById,
);

route.get(
  '/user/:id',
  userValidations.validateToken,
  postController.getPostsByUser,
);

route.get(
  '/user/:id/friends',
  userValidations.validateToken,
  postController.getPostsByFriends,
);

route.post(
  '/',
  userValidations.validateToken,
  postController.createPost,
);

route.post(
  '/:id/vote/:userId',
  userValidations.validateToken,
  postController.addVote,
);

route.delete(
  '/:id',
  userValidations.validateToken,
  postController.deletePost,
);

module.exports = route;
