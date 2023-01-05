import {
  GET_FEED, GET_USER_POSTS, GET_TRENDS, ADD_TRENDS, ADD_LIKE, REMOVE_LIKE, REMOVE_POST, NEW_POST,
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
    case ADD_LIKE:
      return {
        ...state,
        trends: state.trends.map((post) => (
          post.id === action.payload ? {
            ...post,
            isVoted: true,
            rate: post.rate + 1,
          } : post
        )),
        feed: state.feed.map((post) => (
          post.id === action.payload ? {
            ...post,
            isVoted: true,
            rate: post.rate + 1,
          } : post
        )),
      };
    case REMOVE_LIKE:
      return {
        ...state,
        trends: state.trends.map((post) => (
          post.id === action.payload ? {
            ...post,
            isVoted: false,
            rate: post.rate - 1,
          } : post
        )),
        feed: state.feed.map((post) => (
          post.id === action.payload ? {
            ...post,
            isVoted: false,
            rate: post.rate - 1,
          } : post
        )),
      };
    case REMOVE_POST:
      return {
        ...state,
        trends: state.trends.filter((post) => post.id !== action.payload),
        userPosts: state.userPosts.filter((post) => post.id !== action.payload),
      };
    case NEW_POST:
      return {
        ...state,
        trends: [action.payload, ...state.trends],
        feed: [action.payload, ...state.feed],
      };
    default: return state;
  }
};
