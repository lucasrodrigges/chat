import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';
import {
  getPostByOwner, getPosts, getPostsByFriends, getUserProfile,
} from '../services/axios';
import {
  GET_FEED, GET_USER_POSTS, GET_TRENDS, GET_USER,
} from './types';

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

  const getUserById = (id) => {
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

  const getUserPosts = (owner) => {
    getPostByOwner(owner).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_USER_POSTS, payload: data });
    });
  };

  const storage = useMemo(() => ({
    ...store,
    getUserById,
    getTrends,
    getFeed,
    getUserPosts,
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
