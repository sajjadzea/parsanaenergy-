import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const rootEl = document.getElementById('widget-root');
if (rootEl && !rootEl._reactRootContainer) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <BrowserRouter basename="/parsanaenergy/">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
