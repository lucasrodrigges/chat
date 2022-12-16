import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
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
      <ProfileCard user={user} />
      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
