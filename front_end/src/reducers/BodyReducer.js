import {
  REMOVE_BODY_OVERFLOW,
  ADD_BODY_OVERFLOW
} from '../actions/Types';

const INITIAL_STATE = {
  wants: 0
};

function BodyReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case REMOVE_BODY_OVERFLOW:
      document.getElementsByTagName('body')[0].classList.add('no-overflow');
      return { wants: state.wants + 1 };
    case ADD_BODY_OVERFLOW:
      if (state.wants - 1 <= 0) {
        document.getElementsByTagName('body')[0].classList.remove('no-overflow');
        return { wants: 0 };
      }

      return { wants: state.wants - 1 };
    default:
      return state;
  }
}

export default BodyReducer;
