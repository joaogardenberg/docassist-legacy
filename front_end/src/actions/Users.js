import {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DESTROY_USER,
  UNABLE_TO_FETCH_USERS,
  UNABLE_TO_CREATE_USER,
  UNABLE_TO_UPDATE_USER,
  UNABLE_TO_DESTROY_USER
} from './Types';

import * as Api from '../services/apis/Users';

import { openLoader, closeLoader } from '.';

export function fetchUsers() {
  return dispatch => {
    dispatch(openLoader());

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
        type: UNABLE_TO_FETCH_USERS,
        payload: error
      });
    });
  };
}

export function createUser(attributes) {
  return dispatch => {
    dispatch(openLoader());

    Api.createUser(attributes)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: CREATE_USER,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_CREATE_USER,
        payload: error
      });
    });
  }
}

export function updateUser(attributes) {
  return dispatch => {
    dispatch(openLoader());

    Api.updateUser(attributes)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: UPDATE_USER,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_UPDATE_USER,
        payload: error
      });
    });
  }
}

export function destroyUser(id) {
  return dispatch => {
    dispatch(openLoader());

    Api.destroyUser(id)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: DESTROY_USER,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_DESTROY_USER,
        payload: error
      });
    });
  }
}
