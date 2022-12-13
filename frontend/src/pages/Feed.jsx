import React, { useContext } from 'react';
import Menu from '../components/Menu';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

export default function Feed() {
  const { posts: { feed } } = useContext(GlobalContext);

  return (
    <div>
      Feed
      <Menu />
      {feed.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
