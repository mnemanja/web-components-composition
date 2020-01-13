import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as MUI from 'material-ui';

import App from './App';
import { store } from './store/store';

/**
 * Export the material-ui library for other components to use
 */
window.MUI = MUI;

/**
 * Render the react components
 */
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
