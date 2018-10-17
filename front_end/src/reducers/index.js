import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import SidebarReducer             from './SidebarReducer';
import BodyReducer                from './BodyReducer';
import LoaderReducer              from './LoaderReducer';
import PageModalReducer           from './PageModalReducer';
import UsersReducer               from './UsersReducer';

const RootReducer = combineReducers({
  body: BodyReducer,
  sidebar: SidebarReducer,
  loader: LoaderReducer,
  pageModal: PageModalReducer,
  users: UsersReducer,
  form: formReducer
});

export default RootReducer;
