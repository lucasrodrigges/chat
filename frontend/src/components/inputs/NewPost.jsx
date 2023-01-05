import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../context/providers/GlobalProvider';

export default function NewPost({ from }) {
  const { newPost } = useContext(GlobalContext);

  const [body, setBody] = useState('');

  const handdleChange = ({ target: { value } }) => {
    setBody(value);
  };

  const publish = async (e) => {
    e.preventDefault();

    if (body) {
      await newPost(body, from);
      setBody('');
    }
  };

  return (
    <form onSubmit={publish}>
      <input type="text" name="newPost" id="newPost" value={body} onChange={handdleChange} />
      <button type="submit">Post</button>
    </form>
  );
}

NewPost.propTypes = {
  from: PropTypes.string.isRequired,
};
