import { combineReducers }   from 'redux';
import SidebarTogglerReducer from './sidebar_toggler_reducer';

const RootReducer = combineReducers({
  sidebar: SidebarTogglerReducer
});

export default RootReducer;
