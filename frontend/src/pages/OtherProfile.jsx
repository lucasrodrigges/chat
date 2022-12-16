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
      <div>
        <div>
          <h3>{user.name}</h3>
          <span>{user.userName}</span>
          <div>
            <span>{`${user.followers} followers`}</span>
            <span>{`${user.following} following`}</span>
          </div>
          <button type="button">Edit profile</button>
        </div>
        <img className="user_image-circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
      </div>
      <div>
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
