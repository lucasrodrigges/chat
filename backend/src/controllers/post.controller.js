const postService = require('../services/post.service');

module.exports = {
  getPosts: async (req, res) => {
    const { q, offset } = req.query;
    const { userId } = req.headers;
    const output = await postService.getPosts(q, offset, userId);

    return res.status(200).json(output);
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    const output = await postService.getPostById(id);

    return res.status(200).json(output);
  },

  getPostsByUser: async (req, res) => {
    const { id } = req.params;
    const output = await postService.getPostsByUser(id);

    return res.status(200).json(output);
  },

  getPostsByFriends: async (req, res) => {
    const { id } = req.params;
    const output = await postService.getPostsByFriends(id);

    return res.status(200).json(output);
  },

  createPost: async (req, res) => {
    const { userId } = req.headers;
    const output = await postService.createPost(userId, req.body);

    return res.status(201).json(output);
  },

  addVote: async (req, res) => {
    const { userId } = req.headers;
    const { targetId } = req.params;

    await postService.addVote(userId, targetId);

    return res.status(200).end();
  },

  removeVote: async (req, res) => {
    console.log('rodou');
    const { userId } = req.headers;
    const { targetId } = req.params;

    await postService.removeVote(userId, targetId);

    return res.status(200).end();
  },

  deletePost: async (req, res) => {
    const { userId } = req.headers;
    const { id } = req.params;

    await postService.deletePost(userId, id);

    return res.status(200).end();
  },
};
