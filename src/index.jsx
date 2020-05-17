import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import Theme from './theme/theme';

const app = (
  <StrictMode>
    <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
