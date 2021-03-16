import {ActionType} from '../action';
import {ALL_GENRES} from '../../utils/const';

const initialState = {
  films: [],
  isFilmsLoaded: false,
};

const films = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.GET_FILMS:
      if (state.genre === ALL_GENRES) {
        return {
          ...state,
          films: initialState.films,
        };
      }
      const sortedFilms = initialState.films.filter((film) => film.genre === state.genre);
      return {
        ...state,
        films: sortedFilms,
      };

    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: payload,
        isFilmsLoaded: true,
      };

    default:
      return state;
  }
};

export {films};
