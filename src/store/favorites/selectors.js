import {Namespace} from '../reducer';

export const getLoadedFavoritesStatus = (state) => state[Namespace.FAVORITES].isFavoritesLoaded;
export const getFavorites = (state) => state[Namespace.FAVORITES].favorites;
