import {
  GET_FRIENDS_SIDEBAR,
  ADD_FRIENDS_SIDEBAR,
} from '../../types';

export const messagesInitialState = {
  friends: {
    data: [],
    lastPage: false,
  },
};

export const messagesReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
