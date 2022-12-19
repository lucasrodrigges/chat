/* eslint-disable react/prop-types */
import React, { useContext, useRef } from 'react';
import heart from '../assets/icons/heart.svg';
import filledHeart from '../assets/icons/filledHeart.svg';
import { GlobalContext } from '../context/GlobalProvider';

import './ReducedPostList.css';

export default function ReducedPostList({ content, lastPage, nextPage }) {
  return (
    <ul className="reduced_post-list" translate="no">
      {content.map(({
        author, body, id, rate, isVoted,
      }) => {
        const { likePostFromSidebar, unlikePostFromSidebar } = useContext(GlobalContext);
        const rateRef = useRef();

        const vote = () => {
          if (!isVoted) {
            likePostFromSidebar(id);
            rateRef.current.className = 'liked';
          } else {
            unlikePostFromSidebar(id);
            rateRef.current.className = 'unliked';
          }
        };

        return (
          <li key={id}>
            <div className="reduced_post-left">
              <img className="user_image-quad" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
              <div className="post-content">
                <span className="user_name">{ author.name }</span>
                <p>{ body }</p>
              </div>
            </div>
            <div className="reduced_post-rate">
              <span className="reduced_post-rate">{rate}</span>
              <button ref={rateRef} type="button" onClick={vote}>
                <img src={isVoted ? filledHeart : heart} alt="heart" />
              </button>
            </div>
          </li>
        );
      })}

      { !lastPage && content.length ? (
        <button
          type="button"
          className="see_more"
          translate="yes"
          onClick={() => nextPage()}
        >
          See more...

        </button>
      ) : null }
    </ul>
  );
}
