import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { upgradeLegacyLinks } from './lib/router.js';
import './index.css';

// Old /#/blog and /blog links land on /readings before the first render.
upgradeLegacyLinks();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
