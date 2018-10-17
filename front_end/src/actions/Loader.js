import {
  OPEN_LOADER,
  CLOSE_LOADER
} from './Types';

import { removeBodyOverflow, addBodyOverflow } from '.';
import * as Window                             from './Window';

export function openLoader() {
  return dispatch => {
    Window.scrollToTop();
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
