import {
  FETCH_USERS,
  UNABLE_TO_FETCH_USERS
} from './Types';

import * as Api from '../services/apis/Users';

import { closeLoader } from '.';

export function fetchUsers() {
  return dispatch => {
    Api.fetchUsers()
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: FETCH_USERS,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_FETCH_USERS
      });
    });
  };
}
