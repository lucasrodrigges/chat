/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';

import searchIcon from '../assets/icons/search.svg';
import { GlobalContext } from '../context/GlobalProvider';

import ReducedPostList from './ReducedPostList';
import UserList from './UserList';

import './Sidebar.css';

let currentSearch;
export default function Sidebar() {
  const context = useContext(GlobalContext);
  const { users: { user } } = context;

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('users');

  const sidebarRef = useRef();

  const fetchResults = ({ reset } = {}) => {
    if (reset) context.resetSidebar();

    switch (searchType) {
      case 'posts':
        return context.getPostsToSidebar(currentSearch);
      default: return context.getUsersToSidebar(currentSearch);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentSearch === search || !search) return;

    currentSearch = search;
    fetchResults({ reset: true });
  };

  const resize = ({ screenX }) => {
    const initialWidth = sidebarRef.current.offsetWidth;

    const mouseMove = ({ clientX }) => {
      const dif = clientX - screenX;

      sidebarRef.current.style.width = `${initialWidth + dif}px`;
    };

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  };

  useEffect(() => {
    const current = context.sidebar[searchType];

    if (currentSearch && !current.data.length && !current.lastPage) {
      fetchResults();
    }
  }, [searchType]);

  return (
    <div id="sidebar-wrapper">
      <section className="sidebar" ref={sidebarRef}>
        <div className="sidebar-search">
          <form className="search-bar" onSubmit={handleSubmit}>
            <img src={searchIcon} alt="magnifying glass" />
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
          </form>

          <div className="search-types">
            <input
              className={searchType === 'users' ? 'active' : 'inactive'}
              type="button"
              value="Users"
              translate="no"
              onClick={() => setSearchType('users')}
            />

            <input
              className={searchType === 'posts' ? 'active' : 'inactive'}
              type="button"
              value="Posts"
              translate="no"
              onClick={() => setSearchType('posts')}
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
      <input
        type="button"
        id="sidebar-resizer"
        onMouseDown={resize}
      />
    </div>
  );
}

function SearchResults({ type }) {
  const { sidebar, addPostsToSidebar, addUsersToSidebar } = useContext(GlobalContext);

  switch (type) {
    case 'posts':
      return (
        <ReducedPostList
          content={sidebar.posts.data}
          lastPage={sidebar.posts.lastPage}
          nextPage={() => addPostsToSidebar(currentSearch)}
        />
      );
    default:
      return (
        <UserList
          content={sidebar.users.data}
          lastPage={sidebar.users.lastPage}
          nextPage={() => addUsersToSidebar(currentSearch)}
        />
      );
  }
}
