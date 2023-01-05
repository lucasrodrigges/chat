import { GET_USER_CHAT } from '../../types';

export const chatInitialState = {
  user: {},
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_CHAT:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
