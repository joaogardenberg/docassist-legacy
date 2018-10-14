import {
  FETCH_USERS,
  UNABLE_TO_FETCH_USERS
} from '../actions/Types';

import _          from 'lodash';
import * as Toast from '../common/Toast';

const INITIAL_STATE = {};

function UsersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      return { ...state, users: _.mapKeys(action.payload, 'id') };
    case UNABLE_TO_FETCH_USERS:
      Toast.error('Ocorreu um erro ao carregar os usuários. Tente recarregar a página.', 0);
      return { ...state };
    default:
      return { ...state };
  }
}

export default UsersReducer;
