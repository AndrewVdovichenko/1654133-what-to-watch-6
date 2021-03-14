import {Namespace} from '../reducer';

export const getAuthorizationStatus = (state) => state[Namespace.USER].authorizationStatus;
export const getUser = (state) => state[Namespace.USER].user;
