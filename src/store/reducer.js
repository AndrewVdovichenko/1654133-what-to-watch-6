import {ActionType} from './action';
import {ALL_GENRES, FILMS_PER_STEP, AuthorizationStatus} from '../utils';

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
  showedFilmsCount: FILMS_PER_STEP,
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
        showedFilmsCount: FILMS_PER_STEP,
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

    case ActionType.SHOW_MORE:
      return {
        ...state,
        showedFilmsCount: state.showedFilmsCount + FILMS_PER_STEP,
      };

    default:
      return state;
  }
};

export {reducer};
