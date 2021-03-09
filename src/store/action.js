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

export const ActionCreator = {
  selectGenre: (genre) => ({
    type: ActionType.SELECT_GENRE,
    payload: genre,
  }),

  getFilms: () => ({
    type: ActionType.GET_FILMS,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo,
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  showMore: () => ({
    type: ActionType.SHOW_MORE,
  }),

  loadUserInfo: (userInfo) => ({
    type: ActionType.LOAD_USER_INFO,
    payload: userInfo,
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};
