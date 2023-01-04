/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FriendList({
  content, lastPage, nextPage, getContent,
}) {
  useEffect(() => {
    if (!content.length) getContent();
  }, []);

  return (
    <ul className="user-list">
      {content.map(({ name, id }) => (
        <li key={id}>
          <Link to={`/chat/${id}`}>
            <img className="small_quad" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
            <div>
              <span className="user_name">{name}</span>
            </div>
          </Link>
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
