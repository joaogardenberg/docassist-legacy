import React     from 'react';
import ReactDOM  from 'react-dom';
import PageModal from './PageModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
