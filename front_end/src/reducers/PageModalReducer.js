import {
  PAGE_MODAL_OPENED,
  PAGE_MODAL_CLOSED
} from '../actions/Types';

const INITIAL_STATE = {
  active: false
};

function PageModalReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PAGE_MODAL_OPENED:
      return { active: true };
    case PAGE_MODAL_CLOSED:
      return { active: false };
    default:
      return state;
  }
}

export default PageModalReducer;
