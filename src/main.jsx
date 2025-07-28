import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (rootElement && !rootElement._reactRootContainer) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
