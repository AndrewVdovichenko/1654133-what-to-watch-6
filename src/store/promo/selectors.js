import {Namespace} from '../reducer';

export const getLoadedPromoStatus = (state) => state[Namespace.PROMO].isPromoLoaded;
export const getPromo = (state) => state[Namespace.PROMO].promo;
