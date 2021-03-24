import {loadFilms, loadPromo, requireAuthorization, loadUserInfo, redirectToRoute, loadMovie, loadComments, loadFavorites, updateFavorites} from './action';
import {AuthorizationStatus, HttpCode} from '../utils/const';
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
    .catch((error) => {
      if (error.response.status === HttpCode.NOT_FOUND) {
        dispatch(redirectToRoute(`/404`));
      }
    })
);

export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(loadComments(data)))
);

export const addToFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
    .then(() => dispatch(updateFavorites(status === 1)))
    .catch(() => dispatch(redirectToRoute(`/login`)))
);

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(`/favorite`)
    .then(({data}) => data.map((value) => adaptToClient(value)))
    .then((data) => dispatch(loadFavorites(data)))
);

export const postComment = (id, comment) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, comment)
    .then(() => dispatch(redirectToRoute(`/films/${id}`)))
    .then(() => dispatch(fetchComments(id)))
    .catch(() => {})
);
