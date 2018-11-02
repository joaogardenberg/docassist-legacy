import React           from 'react';
import ReactDOM        from 'react-dom';
import PatientsIndex   from './Index';
import PatientsNew     from './New';
import PatientsEdit    from './Edit';
import PatientsDestroy from './Destroy';
import PatientsShow    from './Show';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <div>
      <PatientsIndex />
      <PatientsNew />
      <PatientsEdit />
      <PatientsDestroy />
      <PatientsShow />
    </div>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
