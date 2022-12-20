/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import searchIcon from '../../assets/icons/search.svg';

export default function MessageMode({ setMode, setTab, tab }) {
  useEffect(() => {
    setTab('messages');
  }, []);

  return (
    <div className="sidebar-header">
      <button type="button" className="search-bar" onClick={() => setMode('search')}>
        <img src={searchIcon} alt="magnifying glass" />
      </button>

      <div className="tab-choise">
        <input
          className={tab === 'messages' ? 'active' : 'inactive'}
          type="button"
          value="Messages"
          translate="no"
          onClick={() => setTab('messages')}
        />

        <input
          className={tab === 'friends' ? 'active' : 'inactive'}
          type="button"
          value="Friends"
          translate="no"
          onClick={() => setTab('friends')}
        />
      </div>
    </div>
  );
}
