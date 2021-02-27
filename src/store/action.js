export const ActionType = {
  SELECT_GENRE: `selectGenre`,
  GET_FILMS: `getFilms`,
};

export const ActionCreator = {
  selectGenre: (genre) => ({
    type: ActionType.SELECT_GENRE,
    payload: genre,
  }),
  getFilms: () => ({
    type: ActionType.GET_FILMS,
  })
};
