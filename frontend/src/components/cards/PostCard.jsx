import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fromNow from '../../services/fromNow';

import './PostCard.css';

export default function PostCard({ post }) {
  const {
    body, rate, author, createdAt,
  } = post;
  const { userName, name } = author;

  return (
    <li className="post-card_wrapper">
      <div className="post-card">
        <div className="post_user-info">
          <Link to={`/${userName}`}>
            <img className="user_image-circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
          </Link>
          <div>
            <h3>{name}</h3>
            <div>
              <span className="username">{`@${userName}`}</span>
              <span translate="yes">{ fromNow(createdAt) }</span>
            </div>
          </div>
        </div>

        <div className="post-content">
          <div className="post-rate">
            <svg className="up-btn" width="29" height="21" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 17.1562L14.4502 0L29 17.2753L26.0417 20.7884L14.4502 7.02528L2.95857 20.669L0 17.1562Z" fill="currentColor" />
            </svg>
            <span>{rate}</span>
          </div>

          <div className="post-body">
            <p>{body}</p>
            <svg viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1671 17.6712C18.1958 17.6712 17.3271 18.0477 16.6626 18.6378L7.55133 13.4288C7.61518 13.1403 7.66631 12.8515 7.66631 12.5503C7.66631 12.2492 7.61518 11.9605 7.55133 11.672L16.5598 6.51377C17.2497 7.14103 18.1572 7.53031 19.1666 7.53031C21.2877 7.53031 23 5.84823 23 3.76515C23 1.68208 21.2877 0 19.1666 0C17.0457 0 15.3334 1.68208 15.3334 3.76515C15.3334 4.06616 15.3843 4.35492 15.4487 4.64343L6.4399 9.8019C5.75 9.17411 4.84258 8.78536 3.83316 8.78536C1.71204 8.78536 0 10.4669 0 12.5503C0 14.6336 1.71231 16.3151 3.83316 16.3151C4.84258 16.3151 5.75 15.9261 6.43884 15.2986L15.5366 20.5196C15.4728 20.7831 15.4344 21.0591 15.4344 21.3351C15.4344 23.3559 17.1083 25 19.1655 25C21.223 25 22.8967 23.3559 22.8967 21.3351C22.8967 19.3145 21.2228 17.6704 19.1655 17.6704L19.1671 17.6712Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </li>
  );
}

PostCard.propTypes = {
  post: PropTypes.instanceOf(Object),
}.isRequired;
