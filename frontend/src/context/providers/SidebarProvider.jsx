import React, {
  createContext, useReducer, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { reducers, initialState } from '../reducers/sidebar';
import {
  getPosts, getUsers, addVote, remoteVote, getFriends,
} from '../../services/axios';
import {
  SET_CURRENT_SEARCH,
  ADD_POSTS_SIDEBAR,
  ADD_USERS_SIDEBAR,
  GET_POSTS_SIDEBAR,
  GET_USERS_SIDEBAR,
  ADD_LIKE_SIDEBAR,
  REMOVE_LIKE_SIDEBAR,
  GET_FRIENDS_SIDEBAR,
  ADD_FRIENDS_SIDEBAR,
  RESET_SIDEBAR,
} from '../types';

export const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [store, dispatch] = useReducer(reducers, initialState);

  const activate = (action) => {
    try {
      dispatch(action);
      console.log(action);
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentSearch = (search) => {
    activate({ type: SET_CURRENT_SEARCH, payload: search });
  };

  const getUsersToSidebar = (q) => {
    getUsers(q).then(({ data, error }) => {
      if (error) return console.error(error);
      return activate({ type: GET_USERS_SIDEBAR, payload: data });
    });
  };

  const addUsersToSidebar = () => {
    const { search } = store;
    getUsers(search.current, search.users.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_USERS_SIDEBAR, payload: data });
    });
  };

  const getPostsToSidebar = (q) => {
    getPosts(q).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: GET_POSTS_SIDEBAR, payload: data });
    });
  };

  const addPostsToSidebar = () => {
    const { search } = store;
    getPosts(search.current, search.posts.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_POSTS_SIDEBAR, payload: data });
    });
  };

  const likePostFromSidebar = (postId) => {
    activate({ type: ADD_LIKE_SIDEBAR, payload: postId });
    addVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const unlikePostFromSidebar = (postId) => {
    activate({ type: REMOVE_LIKE_SIDEBAR, payload: postId });
    remoteVote(postId).then(({ error }) => {
      if (error) console.log(error);
    });
  };

  const getFriendsToSidebar = () => {
    getFriends(store.messages.friends.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: GET_FRIENDS_SIDEBAR, payload: data });
    });
  };

  const addFriendsToSidebar = () => {
    getFriends(store.messages.friends.data.length).then(({ data, error }) => {
      if (error) return console.log(error);
      return activate({ type: ADD_FRIENDS_SIDEBAR, payload: data });
    });
  };

  const resetSidebar = () => activate({ type: RESET_SIDEBAR });

  const storage = useMemo(() => ({
    ...store,
    setCurrentSearch,
    getUsersToSidebar,
    addUsersToSidebar,
    getPostsToSidebar,
    addPostsToSidebar,
    likePostFromSidebar,
    unlikePostFromSidebar,
    getFriendsToSidebar,
    addFriendsToSidebar,
    resetSidebar,
  }));

  return (
    <SidebarContext.Provider value={storage}>
      {children}
    </SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
