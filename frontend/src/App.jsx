import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  const router = createBrowserRouter([{
    path: '/',
    element: <Login />,
  }, {
    path: '/home',
    element: <Home />,
  }]);

  return (
    <RouterProvider router={router} />
  );
}
