import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/cards/PostCard';
import ProfileCard from '../components/cards/ProfileCard';
import { GlobalContext } from '../context/providers/GlobalProvider';
import { getUserProfile } from '../services/axios';

export default function Profile() {
  const {
    users: { user }, posts: { userPosts }, getUserPosts,
  } = useContext(GlobalContext);

  const [currUser, setCurrUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);

  const { userName } = useParams();

  useEffect(() => {
    if (userName === user.userName) {
      setAdmin(true);
      setCurrUser(user);
      getUserPosts(user.id);
    } else {
      getUserProfile(userName).then(({ data, error }) => {
        if (error) return;

        setCurrUser(data);
        getUserPosts(data.id);
      });
    }
  }, [userName]);

  if (!currUser) return <div>User not found</div>; // faremos um componente para isso no futuro.

  return (
    <div>
      <ProfileCard user={currUser} isAdmin={isAdmin} />
      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
