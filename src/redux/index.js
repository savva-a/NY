import { createStore, combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import search from './search';

const store = createStore(
  combineReducers({
    routing,
    search
  }),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export default store;
