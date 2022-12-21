/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import ReducedPostList from '../lists/ReducedPostList';
import UserList from '../lists/UserList';
import { SidebarContext } from '../../context/providers/SidebarProvider';

export default function SearchTabs({ tab }) {
  const sidebarCtx = useContext(SidebarContext);
  const { search } = sidebarCtx;

  switch (tab) {
    case 'posts':
      return (
        <ReducedPostList
          content={search.posts.data}
          lastPage={search.posts.lastPage}
          nextPage={sidebarCtx.addPostsToSidebar}
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
