import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DataTable from './containers/DataTable';
import InsertRecord from './containers/InsertRecord';
import Login from './containers/Login';


function requireAuth(nextState, replace) {
  if ((!localStorage['RTD:user'])) {
    replace({
      pathname: '/login'
    })
  }
}

// function checkIfUserLoggedIn({ location: { pathname }}, replace) {
//   let username;
//   if (typeof localStorage['ReactTabularApp:user'] !== 'undefined') {
//     username = JSON.parse(localStorage['ReactTabularApp:user']).username;
//   }
//   if ((pathname === '/' || pathname === '/posts') && !username) {
//     replace('/login');
//   } else if (pathname === '/' && username) {
//     replace('/posts');
//   }
// }

export default (
  //TODO: Mirar la pagina guardada y anadir la logica de logeo
  <Route path="/" component={App} >
    <IndexRoute component={DataTable} onEnter={requireAuth} />
    <Route path="/login" component={Login} />
    <Route path="/newRecord" component={InsertRecord} />
  </Route>
);