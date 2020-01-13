/*import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import sagas from './rootSagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = createStore (
  rootReducer,
  composeWithDevTools(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);*/

import { init } from '@rematch/core';
import * as models from './models';

export const store = init({
  models,
});
