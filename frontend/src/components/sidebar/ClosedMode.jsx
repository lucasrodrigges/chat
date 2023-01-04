/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import { SidebarContext } from '../../context/providers/SidebarProvider';

import './ClosedMode.css';

export default function ClosedMode({ setMode }) {
  const { messages: { friends }, ...sidebarCtx } = useContext(SidebarContext);

  useEffect(() => {
    sidebarCtx.getFriendsToSidebar();
  }, []);

  return (
    <>
      <div className="closed_sidebar-header">
        <button type="button" onClick={() => setMode('search')}>
          <img src={searchIcon} alt="magnifying glass" width="20px" />
        </button>
      </div>

      <button type="button" className="sidebar-content" onClick={() => setMode('message')}>
        { friends.data.map(({ id }) => (
          <Link to={`chat/${id}`}>
            <li key={id}>
              <img className="reduced_circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
            </li>
          </Link>
        )) }
      </button>
    </>
  );
}
