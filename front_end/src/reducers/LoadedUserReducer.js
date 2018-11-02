import { LOAD_USER } from '../actions/Types';

const INITIAL_STATE = {};

function LoadedUserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_USER:
      return action.payload;
    default:
      return { ...state };
  }
}

export default LoadedUserReducer;
