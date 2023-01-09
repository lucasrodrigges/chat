import apiFetch from './fetch';

export const getUsers = async (q = '', offset = 0) => (
  apiFetch(`/user/?q=${q}&offset=${offset}`, 'get')
);

export const getUserProfile = async (id) => (
  apiFetch(`/user/${id}`, 'get')
);

export const getFriends = async (offset = 0) => (
  apiFetch(`/user/me/connections/?offset=${offset}`, 'get')
);

export const addFriend = async (target) => (
  apiFetch(`/user/connections/${target}`, 'post')
);

export const login = async (body) => (
  apiFetch('/login', 'post', body)
);
