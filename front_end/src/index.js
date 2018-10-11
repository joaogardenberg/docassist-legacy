import React              from 'react';
import ReactDOM           from 'react-dom';
import                         './reset.css';
import                         'bootstrap/dist/css/bootstrap.min.css';
import                         'bootstrap/dist/js/bootstrap.min';
import Fonts              from 'google-fonts';
import                         '@fortawesome/fontawesome-free/css/all.min.css';
import App                from './components/App/App';
import * as serviceWorker from './serviceWorker';

Fonts.add({
  'Open Sans': ['300', '400', '700']
});

ReactDOM.render(<App />, document.getElementById('doc-assist'));
serviceWorker.unregister();
