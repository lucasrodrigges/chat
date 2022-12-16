/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import searchIcon from '../assets/icons/search.svg';
import { GlobalContext } from '../context/GlobalProvider';

import ReducedPostList from './ReducedPostList';
import UserList from './UserList';

import './Sidebar.css';

let currentSearch;
export default function Sidebar() {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('person');

  const context = useContext(GlobalContext);

  const fetchResults = () => {
    switch (searchType) {
      case 'post':
        return context.getPostsToSidebar(currentSearch);
      default: return context.getUsersToSidebar(currentSearch);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentSearch === search || !search) return;

    currentSearch = search;
    fetchResults();
  };

  return (
    <section id="sidebar">
      <div className="sidebar-search">
        <form className="search-bar" onSubmit={handleSubmit}>
          <img src={searchIcon} alt="magnifying glass" />
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </form>

        <div className="search-types">
          <input
            className={searchType === 'person' ? 'active' : 'inactive'}
            type="button"
            value="Persons"
            translate="no"
            onClick={() => setSearchType('person')}
          />

          <input
            className={searchType === 'post' ? 'active' : 'inactive'}
            type="button"
            value="Posts"
            translate="no"
            onClick={() => setSearchType('post')}
          />
        </div>
      </div>

      <div className="sidebar-content">
        <SearchResults type={searchType} />
      </div>
    </section>
  );
}

function SearchResults({ type }) {
  const { sidebar, addPostsToSidebar, addUsersToSidebar } = useContext(GlobalContext);

  switch (type) {
    case 'post':
      return (
        <ReducedPostList
          content={sidebar.posts}
          lastPage={sidebar.lastPost}
          nextPage={() => addPostsToSidebar(currentSearch)}
        />
      );
    default:
      return (
        <UserList
          content={sidebar.users}
          lastPage={sidebar.lastUser}
          nextPage={() => addUsersToSidebar(currentSearch)}
        />
      );
  }
}
