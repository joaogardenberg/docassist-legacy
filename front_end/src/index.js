import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import fonts from 'google-fonts';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

fonts.add({
  'Open Sans': ['300', '400', '700'],
  'Material Icons': true
});

ReactDOM.render(<App />, document.getElementById('DocAssist'));
serviceWorker.unregister();
