import {loadFilms, loadPromo, requireAuthorization, loadUserInfo, redirectToRoute, loadMovie, loadComments} from './action';
import {AuthorizationStatus} from '../utils/const';
import {adaptToClient, adaptUserInfoToClient} from '../utils/helpers';

export const fetchFilmsList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => data.map((value) => adaptToClient(value)))
    .then((data) => dispatch(loadFilms(data)))
);

export const fetchPromoMovie = () => (dispatch, _getState, api) => (
  api.get(`/films/promo`)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadPromo(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loadUserInfo(adaptUserInfoToClient(data)));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => {
      const user = adaptUserInfoToClient(data);
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loadUserInfo(user));
    })
    .then(() => dispatch(redirectToRoute(`/`)))
);

export const fetchMovie = (id) => (dispatch, _getState, api) => (
  api.get(`/films/${id}`)
    .then(({data}) => adaptToClient(data))
    .then((data) => dispatch(loadMovie(data)))
);

export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(loadComments(data)))
);
