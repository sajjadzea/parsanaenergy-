import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('widget-root') || document.getElementById('root');
const isWidget = window.location.pathname.startsWith('/widget');
const basename = isWidget ? '/widget' : undefined;
if (container && !container._reactRootContainer) {
  console.log('Mounting React app');
  createRoot(container).render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );
}
