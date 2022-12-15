import React from 'react';
import PropTypes from 'prop-types';

export default function PostCard({ post: { body, author: { name } } }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{body}</p>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.instanceOf(Object),
}.isRequired;
