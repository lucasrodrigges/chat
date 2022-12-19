const route = require('express').Router();

const userValidations = require('../middlewares/userValidations');
const postController = require('../controllers/post.controller');
const userHelpers = require('../middlewares/userHelpers');

route.get(
  '/post',
  userHelpers.saveUserId,
  postController.getPosts,
);

route.get(
  '/post/:id',
  userValidations.validateToken,
  postController.getPostById,
);

route.get(
  '/post/user/:id/friends',
  userValidations.validateToken,
  userValidations.validateId,
  postController.getPostsByFriends,
);

route.get(
  '/post/user/:id',
  userValidations.validateToken,
  userValidations.validateId,
  postController.getPostsByUser,
);

route.post(
  '/post',
  userValidations.validateToken,
  postController.createPost,
);

route.post(
  '/post/:targetId/vote',
  userValidations.validateToken,
  postController.addVote,
);

route.post(
  '/post/:targetId/unvote',
  userValidations.validateToken,
  postController.removeVote,
);

route.delete(
  '/post/:id',
  userValidations.validateToken,
  postController.deletePost,
);

module.exports = route;
