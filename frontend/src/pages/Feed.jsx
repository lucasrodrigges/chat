import React, { useContext } from 'react';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

import './Feed.css';

export default function Feed() {
  const { posts: { feed } } = useContext(GlobalContext);

  return (
    <div className="feed">
      {feed.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
