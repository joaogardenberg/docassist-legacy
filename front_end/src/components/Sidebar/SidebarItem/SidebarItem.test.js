import React       from 'react';
import ReactDOM    from 'react-dom';
import SidebarItem from './SidebarItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SidebarItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
