import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { Provider }                     from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk                       from 'redux-thunk';

import                                       'materialize-css/dist/css/materialize.min.css';
import                                       'materialize-css/dist/js/materialize.min.js';
import Fonts                            from 'google-fonts';
import                                       '@fortawesome/fontawesome-free/css/all.min.css';
import                                       'react-toastify/dist/ReactToastify.min.css';

import App                              from './components/App/App';
import * as serviceWorker               from './serviceWorker';
import Reducers                         from './reducers';

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
