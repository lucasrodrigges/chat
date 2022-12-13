import React, { useContext } from 'react';
import Menu from '../components/Menu';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

export default function Feed() {
  const { posts } = useContext(GlobalContext);

  return (
    <div>
      Feed
      <Menu />
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
