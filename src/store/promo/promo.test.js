import {promo} from './promo';
import {ActionType} from '../action';

const initialState = {
  promo: {
    name: ``,
    posterUrl: ``,
    genre: ``,
    released: 0,
  },
  isPromoLoaded: false,
};

describe(`Reducer Promo works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(promo(undefined, {})).toEqual(initialState);
  });

  it(`should handle LOAD_PROMO`, () => {
    const payload = {
      name: `movie`,
      released: 2021,
    };
    const loadPromoAction = {
      type: ActionType.LOAD_PROMO,
      payload,
    };

    expect(promo(initialState, loadPromoAction)).toEqual({
      promo: payload,
      isPromoLoaded: true,
    });
  });
});
