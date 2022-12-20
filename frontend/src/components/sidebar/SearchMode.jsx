/* eslint-disable react/prop-types */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';

import { SidebarContext } from '../../context/providers/SidebarProvider';

import searchIcon from '../../assets/icons/search.svg';
import exitIcon from '../../assets/icons/exit.svg';

export default function SearchMode(state) {
  const { setMode, setTab, tab } = state;
  const sidebarCtx = useContext(SidebarContext);
  const currentSearch = sidebarCtx.search.current;

  const [search, setSearch] = useState('');

  const searchBarRef = useRef();

  const fetchResults = ({ reset } = {}) => {
    if (reset) sidebarCtx.resetSidebar();

    switch (tab) {
      case 'posts':
        return sidebarCtx.getPostsToSidebar(search);
      default: return sidebarCtx.getUsersToSidebar(search);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentSearch === search || !search) return;

    sidebarCtx.setCurrentSearch(search);
    fetchResults({ reset: true });
  };

  const exit = () => {
    sidebarCtx.resetSidebar();
    sidebarCtx.setCurrentSearch('');
    setMode('message');
  };

  useEffect(() => {
    const current = sidebarCtx.search[tab];

    if (currentSearch && !current.data.length && !current.lastPage) {
      fetchResults();
    }
  }, [tab]);

  useEffect(() => {
    searchBarRef.current.focus();
    setTab('users');
  }, []);

  return (
    <div className="sidebar-header">
      <form className="search-bar active" onSubmit={handleSubmit}>
        <img src={searchIcon} alt="magnifying glass" />
        <input ref={searchBarRef} type="text" onChange={(e) => setSearch(e.target.value)} />
        <button className="exit-btn" type="button" onClick={exit}>
          <img src={exitIcon} alt="x" />
        </button>
      </form>

      <div className="tab-choise">
        <input
          className={tab === 'users' ? 'active' : 'inactive'}
          type="button"
          value="Users"
          translate="no"
          onClick={() => setTab('users')}
        />

        <input
          className={tab === 'posts' ? 'active' : 'inactive'}
          type="button"
          value="Posts"
          translate="no"
          onClick={() => setTab('posts')}
        />
      </div>
    </div>
  );
}
