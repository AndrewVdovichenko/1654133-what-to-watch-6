import {ActionType} from '../action';

const initialState = {
  films: [],
  isFilmsLoaded: false,
};

const films = (state = initialState, {type, payload}) => {
  switch (type) {
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
