import React          from 'react';
import ReactDOM       from 'react-dom';
import SidebarToggler from './SidebarToggler';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SidebarToggler />, div);
  ReactDOM.unmountComponentAtNode(div);
});
