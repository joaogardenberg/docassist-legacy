import React        from 'react';
import ReactDOM     from 'react-dom';
import UsersIndex   from './Index';
import UsersNew     from './New';
import UsersEdit    from './Edit';
import UsersDestroy from './Destroy';
import UsersShow    from './Show';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <div>
      <UsersIndex />
      <UsersNew />
      <UsersEdit />
      <UsersDestroy />
      <UsersShow />
    </div>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
