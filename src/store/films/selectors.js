import {createSelector} from 'reselect';
import {Namespace} from '../reducer';
import {getMovie} from '../movie/selectors';
import {getSelectedGenre} from '../settings/selectors';
import {ALL_GENRES, LIKE_THIS_SHOWED} from '../../utils/const';

export const getLoadedFilmsStatus = (state) => state[Namespace.FILMS].isFilmsLoaded;
export const getFilms = (state) => state[Namespace.FILMS].films;

export const filmsFilteredByGenreSelector = createSelector(
    [getFilms, getSelectedGenre],
    (films, genre) => {
      if (genre === ALL_GENRES) {
        return films;
      }

      return films.filter((film) => film.genre === genre);
    }
);

export const similarFilmsSelector = createSelector(
    [getFilms, getMovie],
    (films, movie) => {
      return films.filter((film) => film.genre === movie.genre && film.id !== movie.id).slice(0, LIKE_THIS_SHOWED);
    }
);
