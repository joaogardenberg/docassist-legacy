import {
  FETCH_PATIENTS,
  LOAD_PATIENT,
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DESTROY_PATIENT,
  UNABLE_TO_FETCH_PATIENTS,
  UNABLE_TO_CREATE_PATIENT,
  UNABLE_TO_UPDATE_PATIENT,
  UNABLE_TO_DESTROY_PATIENT
} from './Types';

import * as Api from '../services/apis/Patients';

import { openLoader, closeLoader } from '.';

export function fetchPatients() {
  return dispatch => {
    dispatch(openLoader());

    Api.fetchPatients()
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: FETCH_PATIENTS,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_FETCH_PATIENTS,
        payload: error
      });
    });
  };
}

export function loadPatient(patient) {
  return {
    type: LOAD_PATIENT,
    payload: patient
  }
}

export function createPatient(attributes) {
  return dispatch => {
    dispatch(openLoader());

    Api.createPatient(attributes)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: CREATE_PATIENT,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_CREATE_PATIENT,
        payload: error
      });
    });
  }
}

export function updatePatient(attributes) {
  return dispatch => {
    dispatch(openLoader());

    Api.updatePatient(attributes)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: UPDATE_PATIENT,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_UPDATE_PATIENT,
        payload: error
      });
    });
  }
}

export function destroyPatient(id) {
  return dispatch => {
    dispatch(openLoader());

    Api.destroyPatient(id)
    .then(data => {
      dispatch(closeLoader());

      return dispatch({
        type: DESTROY_PATIENT,
        payload: data
      });
    })
    .catch(error => {
      dispatch(closeLoader());

      return dispatch({
        type: UNABLE_TO_DESTROY_PATIENT,
        payload: error
      });
    });
  }
}
