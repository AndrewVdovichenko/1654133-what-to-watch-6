import {films} from './films';
import {ActionType} from '../action';

const initialState = {
  films: [],
  isFilmsLoaded: false,
};
describe(`Reducer Films works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(films(undefined, {})).toEqual(initialState);
  });

  it(`should handle LOAD_FILMS`, () => {
    const payload = [`movie1`, `movie2`];
    const loadFilmsAction = {
      type: ActionType.LOAD_FILMS,
      payload,
    };

    expect(films(initialState, loadFilmsAction)).toEqual({
      films: payload,
      isFilmsLoaded: true,
    });
  });
});
