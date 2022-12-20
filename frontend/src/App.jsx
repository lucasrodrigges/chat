import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Menu from './components/nav/Menu';
import Router from './Router';

import './App.css';

export default function App() {
  return (
    <div className="app">
      <Menu />
      <Sidebar />
      <Router />
    </div>
  );
}
