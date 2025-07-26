import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('widget-root') || document.getElementById('root');
if (container && !container._reactRootContainer) {
  createRoot(container).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
