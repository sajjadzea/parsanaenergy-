import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('widget-root') || document.getElementById('root');
const isWidget = window.location.pathname.startsWith('/widget');
const basename = isWidget ? '/widget' : undefined;

if (!container) {
  console.error('widget root element missing');
} else if (!container._reactRootContainer) {
  createRoot(container).render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );
} else {
  console.warn('widget already mounted');
}
