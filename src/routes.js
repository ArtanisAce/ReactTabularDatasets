import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import DataTable from './containers/DataTable';
import InsertRecord from './containers/InsertRecord';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DataTable} />
    <Route path="/newRecord" component={InsertRecord} />
  </Route>
);