import {combineReducers} from 'redux';
import {promo} from './promo/promo';
import {films} from './films/films';
import {user} from './user/user';
import {settings} from './settings/settings';
import {movie} from './movie/movie';

export const Namespace = {
  PROMO: `PROMO`,
  FILMS: `FILMS`,
  USER: `USER`,
  SETTINGS: `SETTINGS`,
  MOVIE: `MOVIE`,
};

export default combineReducers({
  [Namespace.PROMO]: promo,
  [Namespace.FILMS]: films,
  [Namespace.USER]: user,
  [Namespace.SETTINGS]: settings,
  [Namespace.MOVIE]: movie,
});
