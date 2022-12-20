/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';

import searchIcon from '../assets/icons/search.svg';
import exitIcon from '../assets/icons/exit.svg';
import { GlobalContext } from '../context/GlobalProvider';

import ReducedPostList from './ReducedPostList';
import UserList from './UserList';
import FriendList from './FriendList';

import './Sidebar.css';

let currentSearch;
export default function Sidebar() {
  const context = useContext(GlobalContext);
  const { users: { user } } = context;

  const [mode, setMode] = useState('message');

  const sidebarRef = useRef();

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

  return (
    <div id="sidebar-wrapper">
      <section className="sidebar" ref={sidebarRef}>
        { mode === 'search'
          ? <SearchMode setMode={setMode} />
          : <MessageMode setMode={setMode} /> }

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

function SearchMode({ setMode }) {
  const context = useContext(GlobalContext);

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('users');

  const searchBarRef = useRef();

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

  const exit = () => {
    context.resetSidebar();
    currentSearch = '';
    setMode('message');
  };

  useEffect(() => {
    const current = context.sidebar[searchType];

    if (currentSearch && !current.data.length && !current.lastPage) {
      fetchResults();
    }
  }, [searchType]);

  useEffect(() => searchBarRef.current.focus());

  return (
    <>
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
        <SidebarTabs tab={searchType} />
      </div>
    </>
  );
}

function MessageMode({ setMode }) {
  const [tab, setTab] = useState('messages');

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
        <SidebarTabs tab={tab} />
      </div>
    </>
  );
}

function SidebarTabs({ tab }) {
  const { sidebar } = useContext(GlobalContext);

  switch (tab) {
    case 'posts':
      return (
        <ReducedPostList
          content={sidebar.posts.data}
          lastPage={sidebar.posts.lastPage}
          nextPage={() => sidebar.addPostsToSidebar(currentSearch)}
        />
      );
    case 'friends':
      return (
        <FriendList
          content={sidebar.friends.data}
          lastPage={sidebar.friends.lastPage}
          nextPage={() => sidebar.addFriendsSidebar()}
        />
      );
    default:
      return (
        <UserList
          content={sidebar.users.data}
          lastPage={sidebar.users.lastPage}
          nextPage={() => sidebar.addUsersToSidebar(currentSearch)}
        />
      );
  }
}
