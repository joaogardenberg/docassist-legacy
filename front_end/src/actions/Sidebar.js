import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR
} from './Types';

export function openSidebar() {
  return { type: OPEN_SIDEBAR };
}

export function closeSidebar() {
  return { type: CLOSE_SIDEBAR };
}
