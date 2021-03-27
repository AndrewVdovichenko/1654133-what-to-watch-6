import {
  loadComments,
  loadFavorites,
  loadFilms,
  loadMovie,
  loadPromo,
  loadUserInfo,
  redirectToRoute,
  requireAuthorization,
  resetMovie,
  selectGenre,
  showMore,
  updateFavorites,
  ActionType,
} from './action';

describe(`Actions work correctly`, () => {
  it(`should create an action to load comments with payload`, () => {
    const review1 = {
      id: 1,
      user: {
        id: 1,
        name: `User1`,
      },
      comment: `First review.`,
    };
    const review2 = {
      id: 2,
      user: {
        id: 2,
        name: `User2`,
      },
      comment: `Second review.`,
    };
    const comments = [review1, review2];
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };

    expect(loadComments(comments)).toEqual(expectedAction);
  });

  it(`should create an action to load favorites with payload`, () => {
    const favorites = [];
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };

    expect(loadFavorites(favorites)).toEqual(expectedAction);
  });

  it(`should create an action to load films with payload`, () => {
    const movie1 = {
      id: 1,
      name: `Movie1`,
    };
    const movie2 = {
      id: 2,
      name: `Movie2`,
    };
    const films = [movie1, movie2];
    const expectedAction = {
      type: ActionType.LOAD_FILMS,
      payload: films
    };

    expect(loadFilms(films)).toEqual(expectedAction);
  });

  it(`should create an action to load a movie with payload`, () => {
    const movie = {
      id: 1,
      name: `movie`,
    };
    const expectedAction = {
      type: ActionType.LOAD_MOVIE,
      payload: movie,
    };

    expect(loadMovie(movie)).toEqual(expectedAction);
  });

  it(`should create an action to load promo with payload`, () => {
    const promo = {
      name: `promoName`,
      posterUrl: `posterUrl`,
      previewUrl: `previewUrl`,
      genre: `genre`,
      released: 2021,
    };
    const expectedAction = {
      type: ActionType.LOAD_PROMO,
      payload: promo,
    };

    expect(loadPromo(promo)).toEqual(expectedAction);
  });

  it(`should create an action to load user info with payload`, () => {
    const userInfo = {
      id: 1,
      email: `test@example.com`,
      password: `123`,
      name: `User`,
      avatarUrl: `my-avatar.png`,
    };
    const expectedAction = {
      type: ActionType.LOAD_USER_INFO,
      payload: userInfo,
    };

    expect(loadUserInfo(userInfo)).toEqual(expectedAction);
  });

  it(`should create an action to redirect to route with payload`, () => {
    const url = `/some-url`;
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url,
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`should create an action to require authorization with payload`, () => {
    const status = `auth`;
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it(`should create an action to reset movie without payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_MOVIE,
    };

    expect(resetMovie()).toEqual(expectedAction);
  });


  it(`should create an action to select genre with payload`, () => {
    const genre = `genre`;
    const expectedAction = {
      type: ActionType.SELECT_GENRE,
      payload: genre,
    };

    expect(selectGenre(genre)).toEqual(expectedAction);
  });

  it(`should create an action to show more without payload`, () => {
    const expectedAction = {
      type: ActionType.SHOW_MORE,
    };

    expect(showMore()).toEqual(expectedAction);
  });

  it(`should create an action to update favorites with payload`, () => {
    const status = true;
    const expectedAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: status,
    };

    expect(updateFavorites(status)).toEqual(expectedAction);
  });
});
