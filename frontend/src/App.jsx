import React from 'react';
import Header from './components/nav/Header';
import Sidebar from './components/sidebar/Sidebar';
import Menu from './components/nav/Menu';
import Router from './Router';

import './App.css';

export default function App() {
  return (
    <div className="app">
      <div>
        <Menu />
        <Sidebar />
      </div>

      <main id="main">
        <Header />
        <Router />
      </main>
    </div>
  );
}
