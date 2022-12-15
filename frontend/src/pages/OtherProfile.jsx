import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { GlobalContext } from '../context/GlobalProvider';

export default function OtherProfile() {
  const {
    users: { user }, posts: { userPosts }, getUserById, getUserPosts,
  } = useContext(GlobalContext);

  const { id } = useParams();

  useEffect(() => {
    getUserById(id);
    getUserPosts(id);
  }, [id]);

  return (
    <div>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <span>{user.userName}</span>
        </div>
      )}
      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
