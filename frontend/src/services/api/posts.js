import apiFetch from './fetch';

export const getPosts = async (q = '', offset = 0) => (
  apiFetch(`/post/?q=${q}&offset=${offset}`, 'get')
);

export const getPostByOwner = async (owner) => (
  apiFetch(`/post/user/${owner}`, 'get')
);

export const getPostsByFriends = async () => (
  apiFetch('/post/user/me/friends', 'get')
);

export const createPost = async (body) => (
  apiFetch('/post/', 'post', { body })
);

export const addVote = async (postId) => (
  apiFetch(`/post/${postId}/vote`, 'post')
);

export const remoteVote = async (postId) => (
  apiFetch(`/post/${postId}/unvote`, 'post')
);

export const deletePost = async (id) => (
  apiFetch(`/post/${id}`, 'delete')
);
