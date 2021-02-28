import {ALL_GENRES} from './const';

export const getUniqueGenres = (films) => {
  const uniqueGenres = [ALL_GENRES];

  for (const movie of films) {
    if (!uniqueGenres.includes(movie.genre)) {
      uniqueGenres.push(movie.genre);
    }
  }

  return uniqueGenres;
};

export const getSortedFilmsByGenre = (films, genre) => {
  if (genre === ALL_GENRES) {
    return films;
  }

  return films.filter((film) => film.genre === genre);
};
