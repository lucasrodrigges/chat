import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Chat from './pages/Chat';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <Login />,
  }, {
    path: '/home',
    element: <Home />,
  }, {
    path: '/feed',
    element: <Feed />,
  }, {
    path: '/chat',
    element: <Chat />,
  }, {
    path: '/profile',
    element: <Profile />,
  }]);

  return (
    <RouterProvider router={router} />
  );
}
