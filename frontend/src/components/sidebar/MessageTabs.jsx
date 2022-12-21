/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import FriendList from '../lists/FriendList';
import { SidebarContext } from '../../context/providers/SidebarProvider';
import MessageList from '../lists/MessageList';

export default function MessageTabs({ tab }) {
  const sidebarCtx = useContext(SidebarContext);
  const { messages } = sidebarCtx;

  switch (tab) {
    case 'messages':
      return (
        <MessageList />
      );
    default:
      return (
        <FriendList
          content={messages.friends.data}
          lastPage={messages.friends.lastPage}
          nextPage={sidebarCtx.addFriendsToSidebar}
          getContent={sidebarCtx.getFriendsToSidebar}
        />
      );
  }
}
