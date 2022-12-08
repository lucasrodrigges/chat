import { GET_USER } from '../types';

export const userInitialState = {
  user: {},
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default: return state;
  }
};
