import {
  OPEN_LOADER,
  CLOSE_LOADER
} from './Types';

export function openLoader() {
  return { type: OPEN_LOADER };
}

export function closeLoader() {
  return { type: CLOSE_LOADER };
}
