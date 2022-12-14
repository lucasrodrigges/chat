import React from 'react';
import { Link } from 'react-router-dom';
import feed from '../assets/icons/feed.svg';
import topics from '../assets/icons/topics.svg';
import chat from '../assets/icons/chat.svg';
import profile from '../assets/icons/profile.svg';

export default function Menu() {
  return (
    <nav>
      <Link to="/feed">
        <img src={feed} alt="Feed icon" />
      </Link>
      <Link to="/home">
        <img src={topics} alt="Home icon" />
      </Link>
      <Link to="/chat">
        <img src={chat} alt="Chat icon" />
      </Link>
      <Link to="/profile">
        <img src={profile} alt="Profile icon" />
      </Link>
    </nav>
  );
}
