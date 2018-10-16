import React                       from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import                                  './Routes.scss';
import Dashboard                   from './Dashboard/Dashboard';
import Appointments                from './Appointments/Appointments';
import Patients                    from './Patients/Patients';
import Multiple                    from './common/Multiple/Multiple';
import UsersIndex                  from './Users/Index';
import UsersNew                    from './Users/New.js';
import UsersEdit                   from './Users/Edit';
import UsersDestroy                from './Users/Destroy';
import UsersShow                   from './Users/Show';

const Routes = () => {
  return (
    <Switch>
      {/* Dashboard */}
      <Route path="/dashboard" component={ Dashboard } />
      {/* Appointments */}
      <Route path="/consultas" component={ Appointments } />
      {/* Patients */}
      <Route path="/pacientes" component={ Patients } />
      {/* Users New */}
      <Route path="/usuarios/novo" render={ props => <Multiple components={ [UsersIndex, UsersNew] } { ...props } /> } />
      {/* Users Edit */}
      <Route path="/usuarios/:id/editar" render={ props => <Multiple components={ [UsersIndex, UsersEdit] } { ...props } /> } />
      {/* Users Destroy */}
      <Route path="/usuarios/:id/remover" render={ props => <Multiple components={ [UsersIndex, UsersDestroy] } { ...props } /> } />
      {/* Users Show */}
      <Route path="/usuarios/:id" render={ props => <Multiple components={ [UsersIndex, UsersShow] } { ...props } /> } />
      {/* Users Index */}
      <Route path="/usuarios" render={ props => <Multiple components={ [UsersIndex] } { ...props } /> } />
      {/* Default route if no routes above match */}
      <Redirect to="/usuarios" />
    </Switch>
  );
}

export default Routes;
