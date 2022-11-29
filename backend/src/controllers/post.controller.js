const postService = require('../services/post.service');
const mapStatus = require('../utils/mapStatus');

module.exports = {
  getPosts: async (_req, res) => {
    const { error, output } = await postService.getPosts();

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    const { error, output } = await postService.getPostById(id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  getPostsByUser: async (req, res) => {
    const { id } = req.params;
    const { error, output } = await postService.getPostsByUser(id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  getPostsByFriends: async (req, res) => {
    const { id } = req.params;

    const { error, output } = await postService.getPostsByFriends(id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  createPost: async (req, res) => {
    const { title, body, owner } = req.body;
    const { error, output } = await postService.createPost({ title, body, owner });

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).json(output);
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    const { error, output } = await postService.deletePost(id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(204).json('aaaa');
  },
};
