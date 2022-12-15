import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';
import { getPosts, getPostsByFriends } from '../services/axios';
import { GET_FEED, GET_TRENDS } from './types';

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

  const getUser = () => {

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

  const storage = useMemo(() => ({
    ...store,
    getUser,
    getTrends,
    getFeed,
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
