/* eslint-disable react/prop-types */
import React, {
  useState, useContext, useRef,
} from 'react';

import SearchMode from './SearchMode';
import MessageMode from './MessageMode';
import ClosedMode from './ClosedMode';

import { GlobalContext } from '../../context/providers/GlobalProvider';
import './Sidebar.css';

export default function Sidebar() {
  const { users: { user } } = useContext(GlobalContext);
  const [mode, setMode] = useState('closed');

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
      <section className={mode === 'closed' ? 'closed_sidebar' : 'sidebar'} ref={sidebarRef}>
        <SidebarModes mode={mode} setMode={setMode} />

        <button type="button" className="close-btn" onClick={() => setMode('closed')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64zm128 0c0-17.7-14.3-32-32-32s-32 14.3-32 32V448c0 17.7 14.3 32 32 32s32-14.3 32-32V64z" fill="currentColor" />
          </svg>
        </button>

        <div className="user_profile-sidebar">
          {mode !== 'closed' ? (
            <>
              <div>
                <img className="small_circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" />
                <div>
                  <span>{user.name}</span>
                  <p>{`@${user.userName}`}</p>
                </div>
              </div>
              <svg viewBox="0 0 128 512">
                <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" fill="currentColor" />
              </svg>
            </>
          ) : <img className="small_circle" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="woman" /> }
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

export function SidebarModes({ mode, setMode }) {
  switch (mode) {
    case 'search':
      return <SearchMode setMode={setMode} />;
    case 'message':
      return <MessageMode setMode={setMode} />;
    default:
      return <ClosedMode setMode={setMode} />;
  }
}
