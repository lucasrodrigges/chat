/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import MessageTabs from './MessageTabs';

export default function MessageMode({ setMode }) {
  const [tab, setTab] = useState('friends');

  return (
    <>
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

      <div className="sidebar-content">
        <MessageTabs tab={tab} />
      </div>
    </>
  );
}
