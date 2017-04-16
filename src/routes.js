import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import Details from './components/Details';

import NotFound from './components/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/details" component={Details} />
    {/* можно сделать роутинг вида "/details/:uuid" */}
    <Route path="*" component={NotFound} />
  </Route>
);
