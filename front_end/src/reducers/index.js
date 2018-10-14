import { combineReducers } from 'redux';
import SidebarReducer      from './SidebarReducer';
import LoaderReducer       from './LoaderReducer';
import UsersReducer        from './UsersReducer';

const RootReducer = combineReducers({
  sidebar: SidebarReducer,
  loader: LoaderReducer,
  users: UsersReducer,
});

export default RootReducer;
