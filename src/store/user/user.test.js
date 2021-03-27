import {user} from './user';
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

describe(`Reducer User works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it(`should handle LOAD_USER_INFO`, () => {
    const payload = {
      email: `example@example.com`,
      name: `user`,
    };
    const loadUserInfoAction = {
      type: ActionType.LOAD_USER_INFO,
      payload,
    };

    expect(user(initialState, loadUserInfoAction)).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: payload,
    });
  });

  it(`should handle REQUIRED_AUTHORIZATION`, () => {
    const payload = AuthorizationStatus.AUTH;
    const requiredAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload,
    };

    expect(user(initialState, requiredAuthorizationAction)).toEqual({
      authorizationStatus: payload,
      user: {
        email: ``,
        name: ``,
        avatar: ``,
      },
    });
  });
});
