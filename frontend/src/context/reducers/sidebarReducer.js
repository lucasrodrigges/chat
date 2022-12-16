import {
  GET_POSTS_SIDEBAR, GET_USERS_SIDEBAR, ADD_POSTS_SIDEBAR, ADD_USERS_SIDEBAR,
} from '../types';

export const sidebarInitialState = {
  users: [],
  posts: [],
  lastUser: false,
  lastPost: false,
};

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS_SIDEBAR:
      return {
        ...state,
        users: action.payload,
        lastUser: action.payload.length < 10,
      };
    case ADD_USERS_SIDEBAR:
      return {
        ...state,
        users: [...state.users, ...action.payload],
        lastUser: action.payload.length < 10,
      };
    case GET_POSTS_SIDEBAR:
      return {
        ...state,
        posts: action.payload,
        lastPost: action.payload.length < 10,
      };
    case ADD_POSTS_SIDEBAR:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        lastPost: action.payload.length < 10,
      };
    default: return state;
  }
};
