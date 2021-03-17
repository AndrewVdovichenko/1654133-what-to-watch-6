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

const movie = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.LOAD_MOVIE:
      return {
        ...state,
        movie: payload,
        isMovieLoaded: true,
      };
    case ActionType.RESET_MOVIE:
      return initialState;
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
};

export {movie};
