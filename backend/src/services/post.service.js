const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  getPosts: async () => {
    try {
      return {
        error: null,
        output: await Post.findAll({
          include: {
            model: User,
            as: 'author',
          },
        }),
      };
    } catch (error) {
      console.error(error);

      return { error: 'INTERNAL_ERROR' };
    }
  },

  getPostById: async (id) => {
    try {
      const post = await Post.findOne({
        where: { id },
        include: {
          model: User,
          as: 'author',
        },
      });

      if (!post) return { error: 'NOT_FOUND', output: 'Post not found.' };

      return { error: null, output: post };
    } catch (error) {
      console.error(error);

      return { error: 'INTERNAL_ERROR' };
    }
  },

  getPostsByUser: async (userId) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      return {
        error: null,
        output: await Post.findAll({
          where: { owner: userId },
          // joinTableAttributes: [],
        }),
      };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  getPostsByFriends: async (userId) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      const post = new Post();

      return { error: null, output: await post.getFriendsPosts(userId) };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createPost: async (post) => {
    try {
      return { error: null, output: await Post.create(post) };
    } catch (error) {
      console.error(error);

      return { error: 'INTERNAL_ERROR' };
    }
  },

  deletePost: async (id) => {
    try {
      await Post.destroy({
        where: { id },
      });

      return { error: null };
    } catch (error) {
      console.error(error);

      return { error: 'INTERNAL_ERROR' };
    }
  },
};
