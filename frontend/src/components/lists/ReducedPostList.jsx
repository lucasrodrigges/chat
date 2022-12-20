/* eslint-disable react/prop-types */
import React from 'react';
import ReducedPostCard from '../cards/ReducedPostCard';
import './ReducedPostList.css';

export default function ReducedPostList({ content, lastPage, nextPage }) {
  return (
    <ul className="reduced_post-list">
      {content.map((post) => <ReducedPostCard key={post.id} post={post} />)}

      { !lastPage && content.length > 0 && (
        <input
          type="button"
          className="see_more"
          translate="yes"
          value="See more..."
          onClick={() => nextPage()}
        />
      ) }
    </ul>
  );
}
