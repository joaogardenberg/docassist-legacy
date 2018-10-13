import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from '../actions/Types';

const INITIAL_STATE = {
  open: false
};

function SidebarTogglerReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case OPEN_SIDEBAR:
      document.getElementsByTagName('body')[0].classList.add('no-overflow');
      return { open: true };
    case CLOSE_SIDEBAR:
      document.getElementsByTagName('body')[0].classList.remove('no-overflow');
      return { open: false };
    default:
      return state;
  }
}

export default SidebarTogglerReducer;
