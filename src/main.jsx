import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('widget-root') || document.getElementById('root');
if (root && !root._reactRootContainer) {
  createRoot(root).render(<App />);
}
