import React, { useContext, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

export default function Home() {
  const { posts: { trends }, getTrends } = useContext(GlobalContext);

  useEffect(() => getTrends(), []);

  return (
    <div className="home">
      {trends.length && trends.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
