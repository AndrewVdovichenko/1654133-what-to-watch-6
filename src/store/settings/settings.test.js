import {settings} from './settings';
import {ActionType} from '../action';
import {ALL_GENRES, FILMS_PER_STEP} from '../../utils/const';

const initialState = {
  genre: ALL_GENRES,
  showedFilmsCount: FILMS_PER_STEP,
};

describe(`Reducer Settings works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(settings(undefined, {})).toEqual(initialState);
  });

  it(`should handle SELECT_GENRE`, () => {
    const payload = `new genre`;
    const selectGenreAction = {
      type: ActionType.SELECT_GENRE,
      payload,
    };

    expect(settings(initialState, selectGenreAction)).toEqual({
      genre: payload,
      showedFilmsCount: FILMS_PER_STEP,
    });
  });

  it(`should handle SHOW_MORE`, () => {
    const showMoreAction = {
      type: ActionType.SHOW_MORE,
    };

    expect(settings(initialState, showMoreAction)).toEqual({
      genre: ALL_GENRES,
      showedFilmsCount: FILMS_PER_STEP + FILMS_PER_STEP,
    });
  });
});
