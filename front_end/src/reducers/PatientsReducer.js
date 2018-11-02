import {
  FETCH_PATIENTS,
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DESTROY_PATIENT,
  UNABLE_TO_FETCH_PATIENTS,
  UNABLE_TO_CREATE_PATIENT,
  UNABLE_TO_UPDATE_PATIENT,
  UNABLE_TO_DESTROY_PATIENT
} from '../actions/Types';

import _          from 'lodash';
import * as Toast from '../common/Toast';

const INITIAL_STATE = {};

function PatientsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PATIENTS:
      return _.mapKeys(action.payload, 'id');
    case CREATE_PATIENT:
    case UPDATE_PATIENT:
      return { ...state, [action.payload.id]: action.payload };
    case DESTROY_PATIENT:
      return _.omit(state, `${action.payload}`);
    case UNABLE_TO_FETCH_PATIENTS:
      Toast.error('Ocorreu um erro ao carregar os pacientes. Tente recarregar a página.', 0);
      return { ...state };
    case UNABLE_TO_CREATE_PATIENT:
      Toast.error('Ocorreu um erro ao criar o paciente.', 0);
      return { ...state };
    case UNABLE_TO_UPDATE_PATIENT:
      Toast.error('Ocorreu um erro ao atualizar o paciente.', 0);
      return { ...state };
    case UNABLE_TO_DESTROY_PATIENT:
      Toast.error('Ocorreu um erro ao remover o paciente. Tente novamente mais tarde.', 0);
      return { ...state };
    default:
      return { ...state };
  }
}

export default PatientsReducer;
