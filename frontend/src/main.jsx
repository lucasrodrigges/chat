import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalProvider } from './context/providers/GlobalProvider';
import { SidebarProvider } from './context/providers/SidebarProvider';
import { ChatProvider } from './context/providers/ChatProvider';

import App from './App';
import Login from './pages/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <SidebarProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </SidebarProvider>
    </GlobalProvider>
  </React.StrictMode>,
);
