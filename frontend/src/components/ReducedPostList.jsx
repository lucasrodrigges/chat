/* eslint-disable react/prop-types */
import React from 'react';

export default function ReducedPostList({ content, nextPage }) {
  const { data, lastPage } = content;

  return (
    <ul className="posts-list" translate="no">
      {data.map(({ author, body, id }) => (
        <li key={id}>
          <img width="40px" className="user_image-quad" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
          <div>
            <span className="user_name">{ author.name }</span>
            <p className="post_text">{ body }</p>
          </div>
        </li>
      ))}

      { !lastPage && data.length ? (
        <button
          type="button"
          translate="yes"
          onClick={() => nextPage()}
        >
          View more...

        </button>
      ) : null }
    </ul>
  );
}
