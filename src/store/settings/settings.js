import {ActionType} from '../action';
import {ALL_GENRES, FILMS_PER_STEP} from '../../utils/const';

const initialState = {
  genre: ALL_GENRES,
  showedFilmsCount: FILMS_PER_STEP,
};

const settings = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.SELECT_GENRE:
      return {
        ...state,
        genre: payload,
        showedFilmsCount: FILMS_PER_STEP,
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

export {settings};
