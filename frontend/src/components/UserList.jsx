/* eslint-disable react/prop-types */
import React from 'react';

import './UserList.css';

export default function UserList({ content, nextPage }) {
  const { data, lastPage } = content;

  return (
    <ul className="user-list" translate="no">
      {data.map(({ name, userName, id }) => (
        <li key={id}>
          <img className="user_image-quad" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
          <div>
            <span className="user_name">{ name }</span>
            <p className="post_text">{ userName }</p>
          </div>
        </li>
      ))}

      {!lastPage && data.length ? (
        <button
          type="button"
          className="see_more"
          translate="yes"
          onClick={() => nextPage()}
        >
          See more...

        </button>
      ) : null}
    </ul>
  );
}