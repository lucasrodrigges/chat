const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  getPosts: async () => {
    try {
      return { error: null, output: await Post.findAll() };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  getPostById: async (id) => {
    try {
      const post = await Post.findByPk(id);

      if (!post) return { error: 'NOT_FOUND', output: 'Post not found.' };

      post.rate = await post.countVotes();

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

      const posts = await user.getUserPosts();

      return { error: null, output: posts };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  getPostsByFriends: async (userId) => {
    try {
      const user = await User.findByPk(userId);

      if (!user) return { error: 'NOT_FOUND', output: 'User not found.' };

      return { error: null, output: await user.getFriendsPosts() };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  createPost: async (owner, post) => {
    try {
      return { error: null, output: await Post.create({ owner, ...post }) };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  deletePost: async (userId, id) => {
    try {
      const post = await Post.findOne({ where: { id } });

      if (post.owner !== userId) {
        return { error: 'UNAUTHORIZED', output: 'Unauthorized user' };
      }

      await post.destroy();

      return { error: null };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },

  addVote: async (id, userId) => {
    try {
      const post = await Post.findByPk(id);

      if (!post) return { error: 'NOT_FOUND', output: 'Post not found.' };

      const result = await post.addVote(userId);

      return { error: null, output: result };
    } catch (error) {
      console.error(error);
      return { error: 'INTERNAL_ERROR' };
    }
  },
};
