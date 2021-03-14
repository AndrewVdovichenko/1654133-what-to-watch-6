export const ActionType = {
  SELECT_GENRE: `app/selectGenre`,
  GET_FILMS: `app/getFilms`,
  LOAD_FILMS: `data/loadFilms`,
  LOAD_PROMO: `data/loadPromo`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  SHOW_MORE: `app/showMore`,
  LOAD_USER_INFO: `data/loadUserInfo`,
  REDIRECT_TO_ROUTE: `app/redirectToRoute`,
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
