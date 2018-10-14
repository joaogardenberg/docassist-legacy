import {
  OPEN_LOADER,
  CLOSE_LOADER
} from './Types';

import { removeBodyOverflow, addBodyOverflow } from '.';

export function openLoader() {
  return dispatch => {
    dispatch(removeBodyOverflow());
    return dispatch({ type: OPEN_LOADER });
  };
}

export function closeLoader() {
  return dispatch => {
    dispatch(addBodyOverflow());
    return dispatch({ type: CLOSE_LOADER });
  };
}
