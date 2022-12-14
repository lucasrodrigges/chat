import React from 'react';
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
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
