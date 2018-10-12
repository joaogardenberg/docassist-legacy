import React              from 'react';
import ReactDOM           from 'react-dom';
import                         'materialize-css/dist/css/materialize.min.css';
import                         'materialize-css/dist/js/materialize.min.js';
import Fonts              from 'google-fonts';
import                         '@fortawesome/fontawesome-free/css/all.min.css';
import                         'react-toastify/dist/ReactToastify.min.css';
import App                from './components/App/App';
import * as serviceWorker from './serviceWorker';

Fonts.add({
  'Open Sans': ['300', '400', '700']
});

ReactDOM.render(<App />, document.getElementById('doc-assist'));
serviceWorker.unregister();
