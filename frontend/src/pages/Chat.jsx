import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/nav/Header';
import { chatContext } from '../context/providers/ChatProvider';

export default function Chat() {
  const { userId } = useParams();
  const chatCtx = useContext(chatContext);
  const { broad: { user } } = chatCtx;

  useEffect(() => {
    if (userId && userId !== user.id) chatCtx.getUser(userId);
  }, [userId]);

  return (
    <Header chatMode />
  );
}
