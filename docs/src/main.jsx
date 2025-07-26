import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('widget-root') || document.getElementById('root');
if (container && !container._reactRootContainer) {
  createRoot(container).render(<App />);
}
