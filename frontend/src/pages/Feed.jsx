import React, { useContext, useEffect } from 'react';
import PostCard from '../components/cards/PostCard';
import NewPost from '../components/inputs/NewPost';
import Header from '../components/nav/Header';
import { GlobalContext } from '../context/providers/GlobalProvider';

import './Feed.css';

export default function Feed() {
  const { posts: { feed }, getFeed, users: { user } } = useContext(GlobalContext);

  useEffect(() => getFeed(), []);

  return (
    <>
      <Header />

      <div className="feed">
        <NewPost from="feed" />
        {feed.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
    </>
  );
}
