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

export const adaptToClient = (film) => {
  return {
    id: film.id,
    name: film.name,
    posterUrl: film.poster_image,
    previewUrl: film.preview_image,
    backgroundUrl: film.background_image,
    backgroundColor: film.background_color,
    videoLink: film.video_link,
    previewVideoLink: film.preview_video_link,
    description: film.description,
    rating: film.rating,
    scoresCount: film.scores_count,
    director: film.director,
    starring: film.starring,
    runTime: film.run_time,
    genre: film.genre,
    released: film.released,
    isFavorite: film.is_favorite,
  };
};

export const adaptUserInfoToClient = (userInfo) => {
  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    avatarUrl: userInfo.avatar_url,
  };
};
