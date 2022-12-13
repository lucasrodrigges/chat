import { GET_POSTS } from '../types';

export const postsInitialState = [];

export const postsReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        user: action.payload,
      };
    default: return state;
  }
};
