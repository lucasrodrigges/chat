import React from 'react';
import PropTypes from 'prop-types';
import FriendRequestBtn from '../buttons/FriendRequestBtn';

export default function ProfileCard({ user, isAdmin }) {
  return (
    <div>
      <div>
        <h3>{user.name}</h3>
        <span>{user.userName}</span>
        <div>
          <span>{`${user.followers} followers`}</span>
          <span>{`${user.following} following`}</span>
        </div>
        {isAdmin ? <button type="button">Edit profile</button> : <FriendRequestBtn />}
      </div>
      <img className="small_circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.instanceOf(Object),
}.isRequired;
