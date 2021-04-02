import {movie} from './movie';
import {ActionType} from '../action';

const initialState = {
  movie: {
    id: -1,
    name: ``,
    previewUrl: ``,
    posterUrl: ``,
    backgroundUrl: ``,
    backgroundColor: ``,
    videoLink: ``,
    previewVideoLink: ``,
    description: ``,
    rating: -1,
    scoresCount: -1,
    director: ``,
    starring: [],
    runTime: -1,
    genre: ``,
    released: -1,
    isFavorite: false,
  },
  comments: [],
  isMovieLoaded: false,
};

describe(`Reducer Movie works correctly`, () => {
  it(`should return the initial state`, () => {
    expect(movie(undefined, {})).toEqual(initialState);
  });

  it(`should handle LOAD_COMMENTS`, () => {
    const payload = [`comment1`, `comment2`];
    const loadCommentsAction = {
      type: ActionType.LOAD_COMMENTS,
      payload,
    };

    expect(movie(initialState, loadCommentsAction)).toEqual({
      movie: {
        id: -1,
        name: ``,
        previewUrl: ``,
        posterUrl: ``,
        backgroundUrl: ``,
        backgroundColor: ``,
        videoLink: ``,
        previewVideoLink: ``,
        description: ``,
        rating: -1,
        scoresCount: -1,
        director: ``,
        starring: [],
        runTime: -1,
        genre: ``,
        released: -1,
        isFavorite: false,
      },
      comments: payload,
      isMovieLoaded: false,
    });
  });

  it(`should handle LOAD_MOVIE`, () => {
    const payload = {
      id: 1,
      name: `movie`,
    };
    const loadMovieAction = {
      type: ActionType.LOAD_MOVIE,
      payload,
    };

    expect(movie(initialState, loadMovieAction)).toEqual(
        {
          movie: payload,
          comments: [],
          isMovieLoaded: true,
        }
    );
  });

  it(`should handle RESET_MOVIE`, () => {
    const state = {
      movie: {
        id: 1,
        name: `movie`
      },
      comments: [`comment1`, `comment2`],
      isMovieLoaded: true,
    };
    const resetMovieAction = {
      type: ActionType.RESET_MOVIE,
    };

    expect(movie(state, resetMovieAction)).toEqual(initialState);
  });

  it(`should handle UPDATE_FAVORITES`, () => {
    const state = {
      movie: {
        id: 1,
        name: `movie`,
        isFavorite: false,
      },
      comments: [`comment1`, `comment2`],
      isMovieLoaded: true,
    };
    const updateFavoritesFalseAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: false,
    };
    const updateFavoritesTrueAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: true,
    };

    expect(movie(state, updateFavoritesFalseAction)).toEqual(state);
    expect(movie(state, updateFavoritesTrueAction)).toEqual({
      movie: {
        id: 1,
        name: `movie`,
        isFavorite: true,
      },
      comments: [`comment1`, `comment2`],
      isMovieLoaded: true,
    });
  });
});
