import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {AuthorizationStatus} from '../utils/const';
import {adaptToClient, adaptUserInfoToClient} from '../utils/helpers';
import {ActionType} from './action';
import {
  addToFavorite,
  checkAuth,
  fetchComments,
  fetchFavorites,
  fetchFilmsList,
  fetchMovie,
  fetchPromoMovie,
  login,
  postComment,
} from './api-actions';

const api = createAPI(() => {});
describe(`Async actions work correctly`, () => {
  describe(`addToFavorites works correctly`, () => {
    it(`creates UPDATE_FAVORITES when adding to favorites has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const status = true;
      const addToFavoritesLoader = addToFavorite(id, status);

      apiMock
        .onPost(`/favorite/${id}/${status}`)
        .reply(200, [{fake: true}]);

      return addToFavoritesLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.UPDATE_FAVORITES,
            payload: status === 1,
          });
        })
    });

    it(`creates REDIRECT_TO_ROUTE when adding to favorites throw an error`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const status = true;
      const addToFavoritesLoader = addToFavorite(id, status);

      apiMock
        .onPost(`/favorite/${id}/${status}`)
        .reply(401);

      return addToFavoritesLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REDIRECT_TO_ROUTE,
            payload: `/login`,
          });
        });
    });
  });

  describe(`checkAuth works correctly`, () => {
    it(`creates LOAD_USER_INFO, then REQUIRED_AUTHORIZATION`, () => {
      const serverAuthInfo = {
        id: 1,
        email: `test@example.com`,
        name: `name`,
        avatar_url: `avatarUrl`,
      };
      const appAuthInfo = adaptUserInfoToClient(serverAuthInfo);

      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const checkAuthLoader = checkAuth();

      apiMock
        .onGet(`/login`)
        .reply(200, serverAuthInfo);

      return checkAuthLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_USER_INFO,
            payload: appAuthInfo,
          });

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: ActionType.REQUIRED_AUTHORIZATION,
            payload: AuthorizationStatus.AUTH,
          });
        })
    });
  });

  describe(`fetchComments works correctly`, () => {
    it(`creates LOAD_COMMENTS when fetching comments has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const comment = {
        id: 1,
        user: {
          id: 4,
          name: `Kate Muir`,
        },
        rating: 8.9,
        comment: `Discerning travellers`,
        date: `2019-05-08T14:13:56.569Z`
      };
      const fetchCommentsLoader = fetchComments(id);

      apiMock
        .onGet(`/comments/${id}`)
        .reply(200, comment);

      return fetchCommentsLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_COMMENTS,
            payload: comment,
          });
        });
    });
  });

  describe(`fetchFavorites works correctly`, () => {
    it(`creates LOAD_FAVORITES when fetching favorites has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const serverMovieData = {
        id: 1,
        name: `The Grand Budapest Hotel`,
        poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
        preview_image: `img/the-grand-budapest-hotel.jpg`,
        background_image: `img/the-grand-budapest-hotel-bg.jpg`,
        background_color: `#ffffff`,
        video_link: `https://some-link`,
        preview_video_link: `https://some-link`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
        rating: 8.9,
        scores_count: 240,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
        run_time: 99,
        genre: `Comedy`,
        released: 2014,
        is_favorite: false
      };
      const serverFavoritesData = [serverMovieData, serverMovieData];
      const appMovieData = adaptToClient(serverMovieData);
      const appFavoritesData = [appMovieData, appMovieData];
      const fetchFavoritesLoader = fetchFavorites();

      apiMock
        .onGet(`/favorite`)
        .reply(200, serverFavoritesData);

      return fetchFavoritesLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_FAVORITES,
            payload: appFavoritesData,
          });
        });
    });
  });

  describe(`fetchFilmsList works correctly`, () => {
    it(`creates LOAD_FILMS when fetching films has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const serverMovieData = {
        id: 1,
        name: `The Grand Budapest Hotel`,
        poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
        preview_image: `img/the-grand-budapest-hotel.jpg`,
        background_image: `img/the-grand-budapest-hotel-bg.jpg`,
        background_color: `#ffffff`,
        video_link: `https://some-link`,
        preview_video_link: `https://some-link`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
        rating: 8.9,
        scores_count: 240,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
        run_time: 99,
        genre: `Comedy`,
        released: 2014,
        is_favorite: false
      };
      const serverFavoritesData = [serverMovieData, serverMovieData];
      const appMovieData = adaptToClient(serverMovieData);
      const appFavoritesData = [appMovieData, appMovieData];
      const fetchFilmsListLoader = fetchFilmsList();

      apiMock
        .onGet(`/films`)
        .reply(200, serverFavoritesData);

      return fetchFilmsListLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_FILMS,
            payload: appFavoritesData,
          });
        });
    });
  });

  describe(`fetchMovie works correctly`, () => {
    it(`creates LOAD_MOVIE when fetching a movie has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const serverMovieData = {
        id,
        name: `The Grand Budapest Hotel`,
        poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
        preview_image: `img/the-grand-budapest-hotel.jpg`,
        background_image: `img/the-grand-budapest-hotel-bg.jpg`,
        background_color: `#ffffff`,
        video_link: `https://some-link`,
        preview_video_link: `https://some-link`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
        rating: 8.9,
        scores_count: 240,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
        run_time: 99,
        genre: `Comedy`,
        released: 2014,
        is_favorite: false
      };
      const appMovieData = adaptToClient(serverMovieData);
      const fetchMovieLoader = fetchMovie(id);

      apiMock
        .onGet(`/films/${id}`)
        .reply(200, serverMovieData);

      return fetchMovieLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_MOVIE,
            payload: appMovieData,
          });
        });
    });

    it(`creates REDIRECT_TO_ROUTE when fetching a nonexistent movie`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const nonexistentId = 11111;

      const fetchMovieLoader = fetchMovie(nonexistentId);

      apiMock
        .onPost(`/films/${nonexistentId}`)
        .reply(404);

      return fetchMovieLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REDIRECT_TO_ROUTE,
            payload: `/404`,
          });
        });
    });
  });

  describe(`fetchPromoMovie works correctly`, () => {
    it(`creates LOAD_PROMO when fetching a promo movie has been done`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const serverMovieData = {
        id,
        name: `The Grand Budapest Hotel`,
        poster_image: `img/the-grand-budapest-hotel-poster.jpg`,
        preview_image: `img/the-grand-budapest-hotel.jpg`,
        background_image: `img/the-grand-budapest-hotel-bg.jpg`,
        background_color: `#ffffff`,
        video_link: `https://some-link`,
        preview_video_link: `https://some-link`,
        description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
        rating: 8.9,
        scores_count: 240,
        director: `Wes Andreson`,
        starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
        run_time: 99,
        genre: `Comedy`,
        released: 2014,
        is_favorite: false
      };
      const appMovieData = adaptToClient(serverMovieData);
      const fetchPromoMovieLoader = fetchPromoMovie(id);

      apiMock
        .onGet(`/films/promo`)
        .reply(200, serverMovieData);

      return fetchPromoMovieLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_PROMO,
            payload: appMovieData,
          });
        });
    });
  });

  describe(`login works correctly`, () => {
    it(`makes the correct api call to /login`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const user = {
        email: `Oliver.conner@gmail.com`,
        password: `123456`};
      const serverAuthInfo = {
        id: 1,
        email: `Oliver.conner@gmail.com`,
        name: `Oliver.conner`,
        avatar_url: `img/1.png`,
      };
      const appAuthInfo = adaptUserInfoToClient(serverAuthInfo);
      const loginLoader = login({login: user.email, password: user.password});

      apiMock
        .onPost(`/login`, user)
        .reply(200, serverAuthInfo);

      return loginLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(3);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.LOAD_USER_INFO,
            payload: appAuthInfo,
          });

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: ActionType.REQUIRED_AUTHORIZATION,
            payload: AuthorizationStatus.AUTH,
          });

          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: ActionType.REDIRECT_TO_ROUTE,
            payload: `/`,
          });
        });
    });
  });

  describe(`postComment works correctly`, () => {
    it(`posts a comment correctly`, () => {
      const apiMock = new MockAdapter(api);
      const dispatch = jest.fn();
      const id = 1;
      const commentPost = {
        rating: 1,
        comment: `some ideas`,
      }
      const postCommentLoader = postComment(id, commentPost);

      apiMock
        .onPost(`/comments/${id}`, commentPost)
        .reply(200);

      return postCommentLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: ActionType.REDIRECT_TO_ROUTE,
            payload: `/films/${id}`,
          });
        });
    });
  });
});
