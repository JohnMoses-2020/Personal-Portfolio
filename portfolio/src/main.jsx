import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource-variable/geist';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource-variable/newsreader/opsz-italic.css';

import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';
import './components/common/common.css';
import './world/world.css';

import WorldApp from './world/WorldApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorldApp />
  </React.StrictMode>,
);
