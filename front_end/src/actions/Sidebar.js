import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from './Types';

import { removeBodyOverflow, addBodyOverflow } from '.';

export function openSidebar() {
  return dispatch => {
    dispatch(removeBodyOverflow());
    return dispatch({ type: OPEN_SIDEBAR });
  };
}

export function closeSidebar(active) {
  return dispatch => {
    if (active) {
      dispatch(addBodyOverflow());
      return dispatch({ type: CLOSE_SIDEBAR });
    }
  };
}
