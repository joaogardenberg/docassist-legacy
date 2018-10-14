import {
  OPEN_LOADER,
  CLOSE_LOADER
} from '../actions/Types';

const INITIAL_STATE = {
  active: false
};

function LoaderReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case OPEN_LOADER:
      document.getElementsByTagName('body')[0].classList.add('no-overflow');
      return { active: true };
    case CLOSE_LOADER:
      document.getElementsByTagName('body')[0].classList.remove('no-overflow');
      return { active: false };
    default:
      return state;
  }
}

export default LoaderReducer;
