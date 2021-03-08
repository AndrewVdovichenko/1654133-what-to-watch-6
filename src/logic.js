import {ALL_GENRES} from './utils';

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

export const adaptToClient = (film) => {
  const adaptedFilm = Object.assign(
      {},
      film,
      {
        posterUrl: film.poster_image,
        previewUrl: film.preview_image,
        backgroundUrl: film.background_image,
        backgroundColor: film.background_color,
        videoLink: film.video_link,
        previewVideoLink: film.preview_video_link,
        scoresCount: film.scores_count,
        runTime: film.run_time,
        isFavorite: film.is_favorite,
      }
  );

  delete adaptedFilm.poster_image;
  delete adaptedFilm.preview_image;
  delete adaptedFilm.background_image;
  delete adaptedFilm.background_color;
  delete adaptedFilm.video_link;
  delete adaptedFilm.preview_video_link;
  delete adaptedFilm.scores_count;
  delete adaptedFilm.run_time;
  delete adaptedFilm.is_favorite;

  return adaptedFilm;
};
