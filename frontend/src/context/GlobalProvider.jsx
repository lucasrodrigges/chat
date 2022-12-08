import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';
import axios from '../services/axios';

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
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
    axios.get('/user/me')
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  };

  getUser();

  const storage = useMemo(() => ({
    ...store,
    getUser,
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
