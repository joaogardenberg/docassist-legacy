import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../actions/Types';

const INITIAL_STATE = {
  open: false
};

function SidebarReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case OPEN_SIDEBAR:
      return { open: true };
    case CLOSE_SIDEBAR:
      return { open: false };
    default:
      return state;
  }
}

export default SidebarReducer;
