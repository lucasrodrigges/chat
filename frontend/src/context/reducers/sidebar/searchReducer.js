import {
  SET_CURRENT_SEARCH,
  GET_POSTS_SIDEBAR,
  GET_USERS_SIDEBAR,
  ADD_POSTS_SIDEBAR,
  ADD_USERS_SIDEBAR,
  ADD_LIKE_SIDEBAR,
  REMOVE_LIKE_SIDEBAR,
  CREATE_CONNECTION,
  RESET_SIDEBAR,
} from '../../types';

export const searchInitialState = {
  current: '',
  users: {
    data: [],
    lastPage: false,
  },
  posts: {
    data: [],
    lastPage: false,
  },
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_SEARCH:
      return {
        ...state,
        current: action.payload,
      };
    case GET_USERS_SIDEBAR:
      return {
        ...state,
        users: {
          data: action.payload,
          lastPage: action.payload.length < 10,
        },
      };
    case ADD_USERS_SIDEBAR:
      return {
        ...state,
        users: {
          data: [...state.users.data, ...action.payload],
          lastPage: action.payload.length < 10,
        },
      };
    case GET_POSTS_SIDEBAR:
      return {
        ...state,
        posts: {
          data: action.payload,
          lastPage: action.payload.length < 10,
        },
      };
    case ADD_POSTS_SIDEBAR:
      return {
        ...state,
        posts: {
          data: [...state.posts.data, ...action.payload],
          lastPage: action.payload.length < 10,
        },
      };
    case ADD_LIKE_SIDEBAR:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data.map((post) => (
            post.id === action.payload ? {
              ...post,
              isVoted: true,
              rate: post.rate + 1,
            } : post
          )),
        },
      };
    case REMOVE_LIKE_SIDEBAR:
      return {
        ...state,
        posts: {
          ...state.posts,
          data: state.posts.data.map((post) => (
            post.id === action.payload ? {
              ...post,
              isVoted: false,
              rate: post.rate - 1,
            } : post
          )),
        },
      };
    case CREATE_CONNECTION:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map((user) => (
            user.id === action.payload ? {
              ...user,
              relationship: user.relationship === 0 ? 1 : 3,
            } : user
          )),
        },
      };
    case RESET_SIDEBAR:
      return {
        ...state,
        posts: searchInitialState.posts,
        users: searchInitialState.users,
      };
    default:
      return state;
  }
};
