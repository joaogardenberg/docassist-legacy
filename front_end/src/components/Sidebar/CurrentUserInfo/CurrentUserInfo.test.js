import React           from 'react';
import ReactDOM        from 'react-dom';
import CurrentUserInfo from './CurrentUserInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentUserInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
