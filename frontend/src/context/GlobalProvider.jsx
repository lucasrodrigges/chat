import React, {
  createContext, useReducer, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';
import {
  getPostByOwner, getPosts, getPostsByFriends, getUserProfile, getUsers, addVote, remoteVote, getFriends,
} from '../services/axios';
import {
  GET_FEED,
  GET_USER_POSTS,
  GET_TRENDS, GET_USER,
  ADD_TRENDS,
  ADD_POSTS_SIDEBAR,
  ADD_USERS_SIDEBAR,
  GET_POSTS_SIDEBAR,
  GET_USERS_SIDEBAR,
  ADD_LIKE_SIDEBAR,
  REMOVE_LIKE_SIDEBAR,
  GET_FRIENDS_SIDEBAR,
  ADD_FRIENDS_SIDEBAR,
  RESET_SIDEBAR,
} from './types';
import { getFromLS } from '../services/localstorage';

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

  const getUsersToSidebar = (q) => {
    getUsers(q).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_USERS_SIDEBAR, payload: data });
    });
  };

  const addUsersToSidebar = (q) => {
    getUsers(q, store.sidebar.users.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_USERS_SIDEBAR, payload: data });
    });
  };

  const getPostsToSidebar = (q) => {
    getPosts(q).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: GET_POSTS_SIDEBAR, payload: data });
    });
  };

  const addPostsToSidebar = (q) => {
    getPosts(q, store.sidebar.posts.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_POSTS_SIDEBAR, payload: data });
    });
  };

  const likePostFromSidebar = (postId) => {
    activate({ type: ADD_LIKE_SIDEBAR, payload: postId });
    addVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const unlikePostFromSidebar = (postId) => {
    activate({ type: REMOVE_LIKE_SIDEBAR, payload: postId });
    remoteVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const getFriendsSidebar = () => {
    getFriends(store.sidebar.friends.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: GET_FRIENDS_SIDEBAR, payload: data });
    });
  };

  const addFriendsSidebar = () => {
    getFriends(store.sidebar.friends.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_FRIENDS_SIDEBAR, payload: data });
    });
  };

  const resetSidebar = () => activate({ type: RESET_SIDEBAR });

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
    getUsersToSidebar,
    addUsersToSidebar,
    getPostsToSidebar,
    addPostsToSidebar,
    likePostFromSidebar,
    unlikePostFromSidebar,
    getFriendsSidebar,
    addFriendsSidebar,
    resetSidebar,
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
