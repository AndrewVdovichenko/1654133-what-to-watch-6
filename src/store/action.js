export const ActionType = {
  SELECT_GENRE: `app/selectGenre`,
  GET_FILMS: `app/getFilms`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_PROMO: `data/loadPromo`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  SHOW_MORE: `app/showMore`,
  LOAD_USER_INFO: `data/loadUserInfo`,
  REDIRECT_TO_ROUTE: `app/redirectToRoute`,
  LOAD_MOVIE: `data/loadMovie`,
  RESET_MOVIE: `data/resetMovie`,
  LOAD_COMMENTS: `data/loadComments`,
};

export const selectGenre = (genre) => ({
  type: ActionType.SELECT_GENRE,
  payload: genre,
});

export const getFilms = () => ({
  type: ActionType.GET_FILMS,
});


export const loadFilms = (films) => ({
  type: ActionType.LOAD_FILMS,
  payload: films,
});

export const loadPromo = (promo) => ({
  type: ActionType.LOAD_PROMO,
  payload: promo,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const showMore = () => ({
  type: ActionType.SHOW_MORE,
});

export const loadUserInfo = (userInfo) => ({
  type: ActionType.LOAD_USER_INFO,
  payload: userInfo,
});

export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

export const loadMovie = (movie) => ({
  type: ActionType.LOAD_MOVIE,
  payload: movie,
});

export const resetMovie = () => ({
  type: ActionType.RESET_MOVIE,
});

export const loadComments = (comments) => ({
  type: ActionType.LOAD_COMMENTS,
  payload: comments,
});
