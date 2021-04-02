import {favorites} from './favorites';
import {ActionType} from '../action';

const initialState = {
  favorites: [],
  isFavoritesLoaded: false,
};
describe(`Reducer Favorites works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(favorites(undefined, {})).toEqual(initialState);
  });

  it(`should handle LOAD_FAVORITES`, () => {
    const payload = [`movie1`, `movie2`];
    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload,
    };

    expect(favorites(initialState, loadFavoritesAction)).toEqual(
        {
          favorites: payload,
          isFavoritesLoaded: true,
        }
    );
  });

  it(`should handle UPDATE_FAVORITES`, () => {
    const updateFavoritesAction = {
      type: ActionType.UPDATE_FAVORITES,
    };
    const updateFavoritesActionWithPayload = {
      type: ActionType.UPDATE_FAVORITES,
      payload: `some payload`,
    };

    expect(favorites({
      favorites: [`movie1`, `movie2`],
      isFavoritesLoaded: true,
    }, updateFavoritesAction)).toEqual(initialState);
    expect(favorites({
      favorites: [`movie1`, `movie2`],
      isFavoritesLoaded: true,
    }, updateFavoritesActionWithPayload)).toEqual(initialState);

    expect(favorites({
      favorites: [`movie1`, `movie2`],
      isFavoritesLoaded: false,
    }, updateFavoritesAction)).toEqual(initialState);
    expect(favorites({
      favorites: [`movie1`, `movie2`],
      isFavoritesLoaded: false,
    }, updateFavoritesActionWithPayload)).toEqual(initialState);

    expect(favorites({
      favorites: [],
      isFavoritesLoaded: true,
    }, updateFavoritesAction)).toEqual(initialState);
    expect(favorites({
      favorites: [],
      isFavoritesLoaded: true,
    }, updateFavoritesActionWithPayload)).toEqual(initialState);
  });
});
