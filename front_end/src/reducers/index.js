import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import SidebarReducer             from './SidebarReducer';
import BodyReducer                from './BodyReducer';
import LoaderReducer              from './LoaderReducer';
import PageModalReducer           from './PageModalReducer';
import PatientsReducer            from './PatientsReducer';
import UsersReducer               from './UsersReducer';
import LoadedPatientReducer       from './LoadedPatientReducer';
import LoadedUserReducer          from './LoadedUserReducer';

const RootReducer = combineReducers({
  body: BodyReducer,
  sidebar: SidebarReducer,
  loader: LoaderReducer,
  pageModal: PageModalReducer,
  patients: PatientsReducer,
  users: UsersReducer,
  loadedPatient: LoadedPatientReducer,
  loadedUser: LoadedUserReducer,
  form: formReducer
});

export default RootReducer;
