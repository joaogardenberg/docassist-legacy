import React                       from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import                                  './Routes.scss';
import Dashboard                   from './Dashboard/Dashboard';
import Appointments                from './Appointments/Appointments';
import Multiple                    from './common/Multiple/Multiple';
import PatientsIndex               from './Patients/Index';
import PatientsNew                 from './Patients/New.js';
import PatientsEdit                from './Patients/Edit';
import PatientsDestroy             from './Patients/Destroy';
import PatientsShow                from './Patients/Show';
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
      {/* Patients New */}
      <Route path="/pacientes/novo" render={ props => <Multiple components={ [PatientsIndex, PatientsNew] } { ...props } /> } />
      {/* Patients Edit */}
      <Route path="/pacientes/:id/editar" render={ props => <Multiple components={ [PatientsIndex, PatientsEdit] } { ...props } /> } />
      {/* Patients Destroy */}
      <Route path="/pacientes/:id/remover" render={ props => <Multiple components={ [PatientsIndex, PatientsDestroy] } { ...props } /> } />
      {/* Patients Show */}
      <Route path="/pacientes/:id" render={ props => <Multiple components={ [PatientsIndex, PatientsShow] } { ...props } /> } />
      {/* Patients Index */}
      <Route path="/pacientes" render={ props => <Multiple components={ [PatientsIndex] } { ...props } /> } />
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
      <Redirect to="/pacientes" />
    </Switch>
  );
}

export default Routes;
