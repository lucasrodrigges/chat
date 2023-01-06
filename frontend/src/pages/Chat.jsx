import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chatContext } from '../context/providers/ChatProvider';

export default function Chat() {
  const { userId } = useParams();
  const chatCtx = useContext(chatContext);

  useEffect(() => {
    if (userId) chatCtx.getUser(userId);
  }, [userId]);

  return (
    <div>Chat</div>
  );
}
