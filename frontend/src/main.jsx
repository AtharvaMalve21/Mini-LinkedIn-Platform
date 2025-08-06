import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/UserContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
      <Toaster position="top-center" />
    </UserContextProvider>
  </BrowserRouter>
);
