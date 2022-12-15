import React from 'react';
import PropTypes from 'prop-types';

export default function PostCard({ post: { body, rate, author: { name } } }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{body}</p>
      <span>{rate}</span>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.instanceOf(Object),
}.isRequired;
