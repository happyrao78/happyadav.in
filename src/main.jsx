import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { upgradeLegacyHash } from './lib/router.js';
import './index.css';

// Anything bookmarked as /#/blog lands on /blog before the first render.
upgradeLegacyHash();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
