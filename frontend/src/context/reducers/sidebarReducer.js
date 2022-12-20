import {
  GET_POSTS_SIDEBAR,
  GET_USERS_SIDEBAR,
  ADD_POSTS_SIDEBAR,
  ADD_USERS_SIDEBAR,
  ADD_LIKE_SIDEBAR,
  REMOVE_LIKE_SIDEBAR,
  GET_FRIENDS_SIDEBAR,
  ADD_FRIENDS_SIDEBAR,
  RESET_SIDEBAR,
} from '../types';

export const sidebarInitialState = {
  users: {
    data: [],
    lastPage: false,
  },
  posts: {
    data: [],
    lastPage: false,
  },
  friends: {
    data: [],
    lastPage: false,
  },
};

export const sidebarReducer = (state, action) => {
  switch (action.type) {
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
          data: state.posts.map((post) => (
            post.id === action.payload ? {
              ...post,
              isVoted: false,
              rate: post.rate - 1,
            } : post
          )),
        },
      };
    case GET_FRIENDS_SIDEBAR:
      return {
        ...state,
        friends: {
          data: action.payload,
          lastPage: action.payload.length < 10,
        },
      };
    case ADD_FRIENDS_SIDEBAR:
      return {
        ...state,
        friends: {
          data: [...state.friends.data, ...action.payload],
          lastPage: action.payload.length < 10,
        },
      };
    case RESET_SIDEBAR:
      return sidebarInitialState;
    default:
      return state;
  }
};
