import React, {
  createContext, useReducer, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from '../reducers/global';
import { getUserProfile } from '../../services/api/users';

import {
  addVote,
  createPost,
  deletePost,
  getPostByOwner,
  getPosts,
  getPostsByFriends,
  remoteVote,
} from '../../services/api/posts';

import {
  GET_FEED,
  GET_USER_POSTS,
  GET_TRENDS, GET_USER,
  ADD_TRENDS,
  ADD_LIKE,
  REMOVE_LIKE,
  REMOVE_POST,
} from '../types';
import { getFromLS } from '../../services/localstorage';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [store, dispatch] = useReducer(reducers, initialState);

  const activate = (action) => {
    try {
      dispatch(action);
      console.log(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = (id) => {
    getUserProfile(id).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_USER, payload: data });
    });
  };

  const getFeed = () => {
    getPostsByFriends().then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_FEED, payload: data });
    });
  };

  const getTrends = () => {
    getPosts().then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_TRENDS, payload: data });
    });
  };

  const addTrends = (offset) => {
    getPosts('', offset).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: ADD_TRENDS, payload: data });
    });
  };

  const getUserPosts = (owner) => {
    getPostByOwner(owner).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_USER_POSTS, payload: data });
    });
  };

  const newPost = (body, from) => {
    createPost(body).then(({ error }) => {
      if (error) return console.error(error);
      if (from === 'profile') return getUserPosts('me');
      return getTrends();
    });
  };

  const likePost = (postId) => {
    activate({ type: ADD_LIKE, payload: postId });
    addVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const unlikePost = (postId) => {
    activate({ type: REMOVE_LIKE, payload: postId });
    remoteVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const removePost = (postId) => {
    activate({ type: REMOVE_POST, payload: postId });
    deletePost(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  useEffect(() => {
    if (getFromLS('token')) getUser('me');
  }, [getFromLS('token')]);

  const storage = useMemo(() => ({
    ...store,
    getUser,
    getTrends,
    getFeed,
    getUserPosts,
    addTrends,
    likePost,
    unlikePost,
    removePost,
    newPost,
  }));

  return (
    <GlobalContext.Provider value={storage}>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
