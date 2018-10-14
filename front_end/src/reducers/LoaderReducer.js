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
      return { active: true };
    case CLOSE_LOADER:
      return { active: false };
    default:
      return state;
  }
}

export default LoaderReducer;
