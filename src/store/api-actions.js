import {ActionCreator} from './action';
import {AuthorizationStatus} from '../utils';
import {adaptToClient, adaptUserInfoToClient} from '../logic';

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => data.map((value) => adaptToClient(value)))
    .then((data) => dispatch(ActionCreator.loadFilms(data)))
);

export const fetchPromoMovie = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(ActionCreator.loadPromo(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loadUserInfo(adaptUserInfoToClient(data)));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => {
      const user = adaptUserInfoToClient(data);
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.loadUserInfo(user));
    })
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);
