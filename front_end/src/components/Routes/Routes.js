import React                       from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard                   from './Dashboard/Dashboard';
import Appointments                from './Appointments/Appointments';
import Patients                    from './Patients/Patients';
import Users                       from './Users/Users';

const Routes = () => {
  return (
    <Switch>
      {/* Dashboard */}
      <Route path="/dashboard" component={ Dashboard } />
      <Route path="/dash" component={ Dashboard } />
      {/* Appointments */}
      <Route path="/consultas" component={ Appointments } />
      <Route path="/appointments" component={ Appointments } />
      {/* Patients */}
      <Route path="/pacientes" component={ Patients } />
      <Route path="/patients" component={ Patients } />
      {/* Users */}
      <Route path="/usuários" component={ Users } />
      <Route path="/usuarios" component={ Users } />
      <Route path="/users" component={ Users } />
      {/* Default route if no routes above match */}
      <Redirect to="/dashboard" />
    </Switch>
  );
}

export default Routes;
