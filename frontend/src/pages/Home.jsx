import React, { useContext, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

import './Home.css';

export default function Home() {
  const { posts: { trends }, getTrends, addTrends } = useContext(GlobalContext);

  useEffect(() => getTrends(), []);

  return (
    <div className="home">
      <ul className="posts">
        {trends.length && trends.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}

        { trends.length ? (
          <button
            type="button"
            className="see_more"
            translate="yes"
            onClick={() => addTrends(trends.length)}
          >
            See more...

          </button>
        ) : null }
      </ul>

    </div>
  );
}
