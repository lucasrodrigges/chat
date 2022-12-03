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
    const { userId } = req.headers;
    const { error, output } = await postService.createPost(userId, req.body);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(201).json(output);
  },

  deletePost: async (req, res) => {
    const { userId } = req.headers;
    const { id } = req.params;
    const { error, output } = await postService.deletePost(userId, id);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(200).end();
  },

  addVote: async (req, res) => {
    const { userId } = req.headers;
    const { targetId } = req.params;
    const { error, output } = await postService.addVote(userId, targetId);

    if (error) return res.status(mapStatus(error)).json(output && { message: output });

    return res.status(201).json(output);
  },
};
