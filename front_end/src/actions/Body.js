import {
  REMOVE_BODY_OVERFLOW,
  ADD_BODY_OVERFLOW
} from './Types';

export function removeBodyOverflow() {
  return { type: REMOVE_BODY_OVERFLOW };
}

export function addBodyOverflow() {
  return { type: ADD_BODY_OVERFLOW };
}
