import {ActionType} from './action';
import {MOVIES} from '../mocks/films';
import {ALL_GENRES} from '../utils';

const initialState = {
  genre: ALL_GENRES,
  films: MOVIES,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    case ActionType.SELECT_GENRE:
      return {
        ...state,
        genre: action.payload,
      };

    default:
      return state;
  }
};

export {reducer};
