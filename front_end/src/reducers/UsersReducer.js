import {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DESTROY_USER,
  UNABLE_TO_FETCH_USERS,
  UNABLE_TO_CREATE_USER,
  UNABLE_TO_UPDATE_USER,
  UNABLE_TO_DESTROY_USER
} from '../actions/Types';

import _          from 'lodash';
import * as Toast from '../common/Toast';

const INITIAL_STATE = {};

function UsersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload, 'id');
    case CREATE_USER:
    case UPDATE_USER:
      return { ...state, [action.payload.id]: action.payload };
    case DESTROY_USER:
      return _.omit(state, `${action.payload}`);
    case UNABLE_TO_FETCH_USERS:
      Toast.error('Ocorreu um erro ao carregar os usuários. Tente recarregar a página.', 0);
      return { ...state };
    case UNABLE_TO_CREATE_USER:
      Toast.error('Ocorreu um erro ao criar o usuário.', 0);
      return { ...state };
    case UNABLE_TO_UPDATE_USER:
      Toast.error('Ocorreu um erro ao atualizar o usuário.', 0);
      return { ...state };
    case UNABLE_TO_DESTROY_USER:
      Toast.error('Ocorreu um erro ao remover o usuário. Tente novamente mais tarde.', 0);
      return { ...state };
    default:
      return { ...state };
  }
}

export default UsersReducer;
