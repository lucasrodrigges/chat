import React, { useContext, useEffect } from 'react';
import PostCard from '../components/cards/PostCard';
import NewPost from '../components/inputs/NewPost';
import { GlobalContext } from '../context/providers/GlobalProvider';

import './Home.css';

export default function Home() {
  const {
    posts: { trends, lastTrend }, getTrends, addTrends, users: { user },
  } = useContext(GlobalContext);

  useEffect(() => {
    getTrends();
  }, []);

  return (
    <div className="home">
      <ul className="posts">
        <NewPost from="home" />
        {trends.map((post) => (
          <PostCard post={post} user={user} key={post.id} />
        ))}

        { !lastTrend && trends.length ? (
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
