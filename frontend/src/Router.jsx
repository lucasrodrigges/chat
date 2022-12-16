import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/:userName" element={<Profile />} />
    </Routes>
  );
}
