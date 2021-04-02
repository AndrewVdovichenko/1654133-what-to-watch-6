import {ActionType} from '../action';
import {AuthorizationStatus} from '../../utils/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    email: ``,
    name: ``,
    avatar: ``,
  },
};

const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_USER_INFO:
      return {
        ...state,
        user: payload,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: payload,
      };

    default:
      return state;
  }
};

export {user};
