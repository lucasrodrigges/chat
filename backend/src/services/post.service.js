const Post = require('../models/Post');
const User = require('../models/User');

const { HttpError } = require('../utils/errors');

module.exports = {
  getPosts: async (q = '', offset = 0, userId = 0) => Post.findPosts(q, Number(offset), userId),

  getPostById: async (id) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');

    post.dataValues.rate = await post.countVote();

    return post;
  },

  getPostsByUser: async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) throw new HttpError(404, 'User not found');

    return user.getUserPosts();
  },

  getPostsByFriends: async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) throw new HttpError(404, 'User not found');

    return user.getFriendsPosts();
  },

  createPost: async (owner, post) => Post.create({ owner, ...post }),

  deletePost: async (userId, id) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');
    if (post.owner !== userId) throw new HttpError(401, 'Unauthorized request');

    await post.destroy();
  },

  addVote: async (userId, id) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');

    await post.addVote(userId);
  },

  removeVote: async (userId, id) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');

    await post.removeVote(userId);
  },
};
