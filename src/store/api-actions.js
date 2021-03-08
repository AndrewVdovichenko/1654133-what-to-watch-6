import {ActionCreator} from './action';
import {AuthorizationStatus} from '../utils';
import {adaptToClient} from '../logic';

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
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
);
