import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from './reducers';

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

  };

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
