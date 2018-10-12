import React       from 'react';
import ReactDOM    from 'react-dom';
import HeaderBrand from './HeaderBrand';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderBrand />, div);
  ReactDOM.unmountComponentAtNode(div);
});
