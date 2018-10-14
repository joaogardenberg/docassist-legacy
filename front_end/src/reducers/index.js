import { combineReducers } from 'redux';
import SidebarReducer      from './SidebarReducer';
import BodyReducer         from './BodyReducer';
import LoaderReducer       from './LoaderReducer';
import UsersReducer        from './UsersReducer';

const RootReducer = combineReducers({
  body: BodyReducer,
  sidebar: SidebarReducer,
  loader: LoaderReducer,
  users: UsersReducer,
});

export default RootReducer;
