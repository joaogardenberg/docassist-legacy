import React    from 'react';
import ReactDOM from 'react-dom';
import Multiple from './Multiple';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Multiple />, div);
  ReactDOM.unmountComponentAtNode(div);
});
