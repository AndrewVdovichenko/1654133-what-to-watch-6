import {ActionType} from './action';
import {ALL_GENRES, AuthorizationStatus} from '../utils';

const initialPromo = {
  name: ``,
  posterUrl: ``,
  genre: ``,
  released: ``,
};

const initialState = {
  genre: ALL_GENRES,
  films: [],
  promo: initialPromo,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
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

    case ActionType.LOAD_FILMS:
      return {
        ...state,
        films: action.payload,
        isDataLoaded: true,
      };

    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promo: action.payload,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    default:
      return state;
  }
};

export {reducer};
