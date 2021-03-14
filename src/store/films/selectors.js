import {createSelector} from 'reselect';
import {Namespace} from '../reducer';
import {getSelectedGenre} from '../settings/selectors';
import {ALL_GENRES} from '../../utils/const';

export const getLoadedFilmsStatus = (state) => state[Namespace.FILMS].isFilmsLoaded;
export const getFilms = (state) => state[Namespace.FILMS].films;

export const getFilmsFilteredByGenre = createSelector(
    [getFilms, getSelectedGenre],
    (films, genre) => {
      if (genre === ALL_GENRES) {
        return films;
      }

      return films.filter((film) => film.genre === genre);
    }
);
