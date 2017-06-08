import 'babel-polyfill';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import configureStore from './stores/configureStore';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import { setLoggedInUser } from './actions/userActions';

const store = configureStore();

if (localStorage.tokenize) {
  axios.defaults.headers.common.Authorization = localStorage.tokenize;
  axios.defaults.headers = { 'x-access-token': localStorage.getItem('tokenize') };
  console.log(localStorage.tokenize);
  store.dispatch(setLoggedInUser(jwtDecode(localStorage.tokenize)));
}


ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>,

 document.getElementById('root'));
registerServiceWorker();
