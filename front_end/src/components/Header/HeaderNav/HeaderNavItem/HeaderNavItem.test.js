import React         from 'react';
import ReactDOM      from 'react-dom';
import HeaderNavItem from './HeaderNavItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderNavItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
