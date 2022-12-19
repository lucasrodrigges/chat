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
  const { users: { user } } = context;

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

      <div className="user_profile-sidebar">
        <div>
          <img className="user_image-circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
          <div>
            <span>{user.name}</span>
            <p>{`@${user.userName}`}</p>
          </div>
        </div>
        <svg viewBox="0 0 128 512">
          <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" fill="currentColor" />
        </svg>
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
