import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import { GlobalContext } from '../context/GlobalProvider';
import { getUserProfile } from '../services/axios';

export default function Profile() {
  const {
    users: { user }, posts: { userPosts }, getUserPosts,
  } = useContext(GlobalContext);

  const [currUser, setCurrUser] = useState({});
  const [isAdmin, setAdmin] = useState(false);

  const { userName } = useParams();

  useEffect(() => {
    if (userName === user.userName) {
      setAdmin(true);
      setCurrUser(user);
      getUserPosts(user.id);
    } else {
      getUserProfile(userName).then(({ data }) => {
        setCurrUser(data);
        getUserPosts(data.id);
      });
    }
  }, [userName]);

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
