import React, { useContext, useEffect } from 'react';
import PostCard from '../components/cards/PostCard';
import NewPost from '../components/inputs/NewPost';
import { GlobalContext } from '../context/providers/GlobalProvider';

import './Feed.css';

export default function Feed() {
  const { posts: { feed }, getFeed, users: { user } } = useContext(GlobalContext);

  useEffect(() => getFeed(), []);

  return (
    <div className="feed">
      <NewPost from="feed" />
      {feed.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
}
