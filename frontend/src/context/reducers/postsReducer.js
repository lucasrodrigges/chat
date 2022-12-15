import { GET_FEED, GET_POSTS, GET_TRENDS } from '../types';

export const postsInitialState = {
  feed: [],
  trends: [],
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_TRENDS:
      return {
        ...state,
        trends: action.payload,
      };
    case GET_FEED:
      return {
        ...state,
        feed: action.payload,
      };
    default: return state;
  }
};
