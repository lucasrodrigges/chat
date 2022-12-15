import { GET_FEED, GET_USER_POSTS, GET_TRENDS } from '../types';

export const postsInitialState = {
  feed: [],
  trends: [],
  userPosts: [],
};

export const postsReducer = (state, action) => {
  switch (action.type) {
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
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    default: return state;
  }
};
