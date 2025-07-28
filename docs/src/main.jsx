import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../css/style.css';

const container = document.getElementById('root') || document.getElementById('widget-root');
if (container && !container._reactRootContainer) {
  createRoot(container).render(<App />);
}
