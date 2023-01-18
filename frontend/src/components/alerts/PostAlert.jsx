import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../context/providers/GlobalProvider';

export default function PostAlert({ type, postId, setAlert }) {
  const { removePost } = useContext(GlobalContext);
  const deletePost = () => {
    removePost(postId);
    setAlert(false);
  };

  return (
    <form>
      {type === 'POST_DELETE' && (
        <>
          <h3>Do you really want to delete the post?</h3>
          <button type="button" onClick={deletePost}>Yes</button>
          <button type="button" onClick={() => setAlert(false)}>No, come back!</button>
        </>
      )}
    </form>
  );
}

PostAlert.propTypes = {
  type: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
}.isRequired;
