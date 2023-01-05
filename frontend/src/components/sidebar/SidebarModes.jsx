/* eslint-disable react/prop-types */
import React from 'react';
import SearchMode from './SearchMode';
import MessageMode from './MessageMode';
import ClosedMode from './ClosedMode';

export default function SidebarModes({ mode, setMode }) {
  switch (mode) {
    case 'search':
      return <SearchMode setMode={setMode} />;
    case 'message':
      return <MessageMode setMode={setMode} />;
    default:
      return <ClosedMode setMode={setMode} />;
  }
}
