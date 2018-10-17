import {
  PAGE_MODAL_OPENED,
  PAGE_MODAL_CLOSED
} from './Types';

import { removeBodyOverflow, addBodyOverflow } from '.';
import * as Window                             from './Window';

export function pageModalOpened() {
  return dispatch => {
    Window.scrollToTop();
    dispatch(removeBodyOverflow());
    return dispatch({ type: PAGE_MODAL_OPENED });
  };
}

export function pageModalClosed() {
  return dispatch => {
    dispatch(addBodyOverflow());
    return dispatch({ type: PAGE_MODAL_CLOSED });
  };
}
