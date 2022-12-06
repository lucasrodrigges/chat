const Post = require('../models/Post');
const User = require('../models/User');

const { HttpError } = require('../utils/errors');

module.exports = {
  getPosts: async () => Post.findAll(),

  getPostById: async (id) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');

    post.dataValues.rate = await post.countVotes();

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
    const post = await Post.findOne({ where: { id } });

    if (post.owner !== userId) throw new HttpError(401, 'UNAUTHORIZED');

    return post.destroy();
  },

  addVote: async (id, userId) => {
    const post = await Post.findByPk(id);

    if (!post) throw new HttpError(404, 'Post not found');

    return post.addVote(userId);
  },
};
