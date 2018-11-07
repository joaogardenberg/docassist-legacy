import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk                       from 'redux-thunk';

import                                       'materialize-css/dist/css/materialize.min.css';
import Fonts                            from 'google-fonts';
import                                       '@fortawesome/fontawesome-free/css/all.min.css';
import                                       'react-toastify/dist/ReactToastify.min.css';

import App                              from './components/App/App';
import * as serviceWorker               from './serviceWorker';
import Reducers                         from './reducers';

// Remove alert() function
window.alert = () => {};

// Add Materialize to the variable window.M
window.M = require('materialize-css');

// Add jQuery to the variables window.jquery, window.jQuery and window.$
window.jquery = window.jQuery = window.$ = require('jquery');

// Add DataTables to the variable window.$.DataTable
window.$.DataTable = require('datatables');

// DataTables changes
// window.$.fn.DataTable.ext.pager.numbers_length = 7;
window.$.fn.DataTable.ext.classes = {
  ...window.$.fn.DataTable.ext.classes,
  sPageButton: 'btn-flat waves-effect'
}

// Add Open Sans font
Fonts.add({
  'Open Sans': ['300', '400', '700']
});

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render((
  <Provider store={ createStoreWithMiddleware(Reducers) }>
    <App />
  </Provider>
), document.getElementById('doc-assist'));

serviceWorker.unregister();
