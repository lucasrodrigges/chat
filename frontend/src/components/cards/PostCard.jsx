import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getInterval } from '../../services/time';

import './PostCard.css';
import { GlobalContext } from '../../context/providers/GlobalProvider';
import PostAlert from '../alerts/PostAlert';

export default function PostCard({ post, user }) {
  const {
    id, body, rate, author, createdAt, isVoted,
  } = post;
  const { userName, name } = author;

  const { likePost, unlikePost } = useContext(GlobalContext);

  const [alert, setAlert] = useState(false);

  return (
    <li className="post-card_wrapper">
      <div className="post-card">
        <div className="post_user-info">
          <Link to={`/${userName}`}>
            <img className="small_circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
          </Link>
          <div>
            <h3>{name}</h3>
            <div>
              <span className="username">{`@${userName}`}</span>
              <span translate="yes">{ getInterval(createdAt) }</span>
            </div>
          </div>
        </div>

        <div className="post-content">
          <div className="post-rate">
            <svg
              className={isVoted ? 'up-btn-on' : 'up-btn'}
              width="29"
              height="21"
              viewBox="0 0 29 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => (!isVoted ? likePost(id) : unlikePost(id))}
            >
              <path d="M0 17.1562L14.4502 0L29 17.2753L26.0417 20.7884L14.4502 7.02528L2.95857 20.669L0 17.1562Z" fill="currentColor" />
            </svg>
            <span>{rate}</span>
          </div>

          <div className="post-body">
            <p>{body}</p>
            <svg viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1671 17.6712C18.1958 17.6712 17.3271 18.0477 16.6626 18.6378L7.55133 13.4288C7.61518 13.1403 7.66631 12.8515 7.66631 12.5503C7.66631 12.2492 7.61518 11.9605 7.55133 11.672L16.5598 6.51377C17.2497 7.14103 18.1572 7.53031 19.1666 7.53031C21.2877 7.53031 23 5.84823 23 3.76515C23 1.68208 21.2877 0 19.1666 0C17.0457 0 15.3334 1.68208 15.3334 3.76515C15.3334 4.06616 15.3843 4.35492 15.4487 4.64343L6.4399 9.8019C5.75 9.17411 4.84258 8.78536 3.83316 8.78536C1.71204 8.78536 0 10.4669 0 12.5503C0 14.6336 1.71231 16.3151 3.83316 16.3151C4.84258 16.3151 5.75 15.9261 6.43884 15.2986L15.5366 20.5196C15.4728 20.7831 15.4344 21.0591 15.4344 21.3351C15.4344 23.3559 17.1083 25 19.1655 25C21.223 25 22.8967 23.3559 22.8967 21.3351C22.8967 19.3145 21.2228 17.6704 19.1655 17.6704L19.1671 17.6712Z" fill="currentColor" />
            </svg>
            {user.id === author.id && (
            <svg width="27" height="29" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setAlert(!alert)}>
              <path d="M17.5004 3.24409H13.7692C13.4938 1.41089 11.9084 0 9.9997 0C8.09098 0 6.50566 1.41089 6.23023 3.24409H2.49956C1.12125 3.24409 0 4.36534 0 5.74365V8.75111C0 9.06503 0.254694 9.31973 0.568619 9.31973H1.21276V24.6052C1.21276 26.7147 2.92898 28.431 5.0385 28.431H14.9615C17.071 28.431 18.7872 26.7147 18.7872 24.6052V9.31973H19.4314C19.7453 9.31973 20 9.06503 20 8.75111V5.74365C20 4.36534 18.8788 3.24409 17.5004 3.24409ZM9.9997 1.13724C11.2797 1.13724 12.3521 2.0414 12.613 3.24409H7.38642C7.64734 2.0414 8.71972 1.13724 9.9997 1.13724ZM17.65 24.6052C17.65 26.0878 16.4438 27.2937 14.9615 27.2937H5.0385C3.55624 27.2937 2.35 26.0878 2.35 24.6052V9.31973H17.65V24.6052ZM18.8628 8.18249H1.13724V5.74365C1.13724 4.9926 1.7485 4.38133 2.49956 4.38133H17.5004C18.2515 4.38133 18.8628 4.9926 18.8628 5.74365V8.18249ZM5.02369 23.4878V11.5362C5.02369 11.2222 5.27839 10.9675 5.59231 10.9675C5.90624 10.9675 6.16093 11.2222 6.16093 11.5362V23.4878C6.16093 23.8018 5.90624 24.0564 5.59231 24.0564C5.27839 24.0564 5.02369 23.8018 5.02369 23.4878ZM9.5762 23.4878V11.5362C9.5762 11.2222 9.83089 10.9675 10.1448 10.9675C10.4584 10.9675 10.7134 11.2222 10.7134 11.5362V23.4878C10.7134 23.8018 10.4584 24.0564 10.1448 24.0564C9.83089 24.0564 9.5762 23.8018 9.5762 23.4878ZM14.129 23.4878V11.5362C14.129 11.2222 14.3837 10.9675 14.6976 10.9675C15.0115 10.9675 15.2662 11.2222 15.2662 11.5362V23.4878C15.2662 23.8018 15.0115 24.0564 14.6976 24.0564C14.3837 24.0564 14.129 23.8018 14.129 23.4878Z" fill="black" fillOpacity="0.6" />
            </svg>
            )}
          </div>
        </div>
      </div>
      {alert && (
        <PostAlert type="POST_DELETE" postId={id} setAlert={setAlert} />
      )}
    </li>
  );
}

PostCard.propTypes = {
  post: PropTypes.instanceOf(Object),
}.isRequired;
