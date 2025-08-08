import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import '@parsana/typography/index.css';
import './index.css';

const container = document.getElementById('root') || document.getElementById('widget-root');
if (container && !container._reactRootContainer) {
  createRoot(container).render(
    <BrowserRouter basename="/widget">
      <App />
    </BrowserRouter>
  );
} else {
  console.error('root element missing');
}
