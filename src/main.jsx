import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Service Worker Registration
import AppWrapper from './AppWrapper.jsx';
// React App Initialization
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);