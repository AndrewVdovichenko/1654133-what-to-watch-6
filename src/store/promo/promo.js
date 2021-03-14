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

const promo = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promo: payload,
        isPromoLoaded: true,
      };

    default:
      return state;
  }
};

export {promo};
