import {
  GET_FEED, GET_USER_POSTS, GET_TRENDS, ADD_TRENDS,
} from '../../types';

export const postsInitialState = {
  feed: [],
  trends: [],
  userPosts: [],
  lastTrend: false,
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case GET_TRENDS:
      return {
        ...state,
        trends: action.payload,
        lastTrend: action.payload.length < 10,
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
    case ADD_TRENDS:
      return {
        ...state,
        trends: [...state.trends, ...action.payload],
        lastTrend: action.payload.length < 10,
      };
    default: return state;
  }
};
