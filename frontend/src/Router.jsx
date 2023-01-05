import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Profile from './pages/Profile';

export default function Router() {
  return (
    <Routes>
      <Route path="/:userName" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:userId" element={<Chat />} />
    </Routes>
  );
}
