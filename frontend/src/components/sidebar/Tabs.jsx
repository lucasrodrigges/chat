/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import ReducedPostList from '../lists/ReducedPostList';
import UserList from '../lists/UserList';
import FriendList from '../lists/FriendList';

import { SidebarContext } from '../../context/providers/SidebarProvider';

export default function Tabs({ tab }) {
  const sidebarCtx = useContext(SidebarContext);
  const { search, messages } = sidebarCtx;

  switch (tab) {
    case 'posts':
      return (
        <ReducedPostList
          content={search.posts.data}
          lastPage={search.posts.lastPage}
          nextPage={sidebarCtx.addPostsToSidebar}
        />
      );
    case 'friends':
      return (
        <FriendList
          content={messages.friends.data}
          lastPage={messages.friends.lastPage}
          nextPage={sidebarCtx.addFriendsSidebar}
          getContent={sidebarCtx.getFriendsSidebar}
        />
      );
    default:
      return (
        <UserList
          content={search.users.data}
          lastPage={search.users.lastPage}
          nextPage={sidebarCtx.addUsersToSidebar}
        />
      );
  }
}
