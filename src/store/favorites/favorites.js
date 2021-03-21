import {ActionType} from '../action';

const initialState = {
  favorites: [],
  isFavoritesLoaded: false,
};

const favorites = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_FAVORITES:
      return {
        ...state,
        favorites: payload,
        isFavoritesLoaded: true,
      };

    case ActionType.UPDATE_FAVORITES:
      return initialState;

    default:
      return state;
  }
};

export {favorites};
