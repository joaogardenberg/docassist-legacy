import { LOAD_PATIENT } from '../actions/Types';

const INITIAL_STATE = {};

function LoadedPatientReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_PATIENT:
      return action.payload;
    default:
      return { ...state };
  }
}

export default LoadedPatientReducer;
