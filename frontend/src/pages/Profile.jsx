import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/cards/PostCard';
import ProfileCard from '../components/cards/ProfileCard';
import NewPost from '../components/inputs/NewPost';
import Header from '../components/nav/Header';
import { GlobalContext } from '../context/providers/GlobalProvider';
import { getUserProfile } from '../services/api/users';

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
    <>
      <Header />

      <div>
        <ProfileCard user={currUser} isAdmin={isAdmin} />
        <div>
          <NewPost from="profile" />
          {userPosts.map((post) => (
            <PostCard key={post.id} user={user} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
