import React, { useContext, useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

import './Home.css';

export default function Home() {
  const { posts: { trends }, getTrends } = useContext(GlobalContext);
  const [posts, setPosts] = useState();

  useEffect(() => getTrends(), []);

  return (
    <div className="home">
      <ul className="posts">
        {trends.length && trends.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
