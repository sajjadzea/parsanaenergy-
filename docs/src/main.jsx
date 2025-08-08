import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@parsana/typography/index.css';
import '../css/style.min.css';

const container = document.getElementById('root') || document.getElementById('widget-root');
if (container && !container._reactRootContainer) {
  createRoot(container).render(<App />);
}
