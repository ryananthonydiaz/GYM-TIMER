import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core';
import Theme from './theme/theme';
import { CssBaseline } from '@material-ui/core';
import StateProviders from './state/StateProviders';

const app = (
    <MuiThemeProvider theme={Theme}>
      <CssBaseline />
      <StateProviders>
        <App />
      </StateProviders>
    </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));
