import {
  OPEN_LOADER,
  CLOSE_LOADER
} from '../actions/Types';

const INITIAL_STATE = {
  wants: 0,
  active: false
};

function LoaderReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case OPEN_LOADER:
      return { active: true, wants: state.wants + 1 };
    case CLOSE_LOADER:
      let active = true;

      if (state.wants - 1 <= 0) {
        active = false;
      }

      return { active, wants: state.wants - 1 }
    default:
      return state;
  }
}

export default LoaderReducer;
