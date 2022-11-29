const route = require('express').Router();

const postController = require('../controllers/post.controller');

route.get('/', postController.getPosts);

route.get('/:id', postController.getPostById);

route.get('/user/:id', postController.getPostsByUser);

route.get('/user/:id/friends', postController.getPostsByFriends);

route.post('/', postController.createPost);

route.delete('/:id', postController.deletePost);

module.exports = route;
