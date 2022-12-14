/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../context/providers/SidebarProvider';
import FriendRequestBtn from '../buttons/FriendRequestBtn';
import './UserList.css';

export default function UserList({ content, lastPage, nextPage }) {
  return (
    <ul className="user-list" translate="no">
      {content.map(({
        name, bio, id, userName, relationship,
      }) => (
        <li key={id}>
          <Link to={`/${userName}`}>
            <img className="small_quad" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
            <div>
              <span className="user_name">{ name }</span>
              <p className="post_text">{ bio }</p>
            </div>
          </Link>

          <FriendRequestBtn status={relationship} target={id} />
        </li>
      ))}

      {!lastPage && content.length > 0 && (
        <input
          type="button"
          className="see_more"
          translate="yes"
          value="See more..."
          onClick={() => nextPage()}
        />
      )}
    </ul>
  );
}
