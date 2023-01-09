/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from '../reducers/chat';
import { GET_USER_CHAT } from '../types';

import { getUserProfile } from '../../services/api/users';

export const chatContext = createContext();

export function ChatProvider({ children }) {
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
      return activate({ type: GET_USER_CHAT, payload: data });
    });
  };

  const storage = useMemo(() => ({
    ...store,
    getUser,
  }));

  return (
    <chatContext.Provider value={storage}>
      {children}
    </chatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
