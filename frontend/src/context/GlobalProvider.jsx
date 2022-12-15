import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';
import { getPosts } from '../services/axios';
import { GET_TRENDS } from './types';

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

  const getTrends = () => {
    getPosts().then(({ status, data }) => {
      if (status === 200) activate({ type: GET_TRENDS, payload: data });
    });
  };

  const storage = useMemo(() => ({
    ...store,
    getUser,
    getTrends,
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
