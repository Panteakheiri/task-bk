import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: 'rtl',
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>
  
);

