import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ALL_GENRES, FILMS_PER_STEP, AuthorizationStatus} from '../../utils/const';
import App from './app';
import {createAPI} from '../../services/api';

const api = createAPI(() => {});
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`renders 'MainView' when user navigate to '/' url`, () => {
    const movie = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "posterUrl": `img/the-grand-budapest-hotel-poster.jpg`,
      "previewUrl": `img/the-grand-budapest-hotel.jpg`,
      "backgroundUrl": `img/the-grand-budapest-hotel-bg.jpg`,
      "backgroundColor": `#ffffff`,
      "videoLink": `https://some-link`,
      "previewVideoLink": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scoresCount": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "runTime": 99,
      "genre": `Comedy`,
      "released": 2014,
      "isFavorite": false
    };
    const store = mockStore({
      PROMO: {
        promo: movie,
        isPromoLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          avatarUrl: `http://some-avatart`,
        }
      },
      FILMS: {
        films: [movie],
        isFilmsLoaded: true,
      },
      SETTINGS: {
        genre: ALL_GENRES,
        showedFilmsCount: FILMS_PER_STEP,
      }
    });

    const history = createMemoryHistory();
    history.push(`/`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(ALL_GENRES)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`renders 'AddReviewView' when user navigate to '/films/:id/review' url`, () => {
    const movie = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "posterUrl": `img/the-grand-budapest-hotel-poster.jpg`,
      "previewUrl": `img/the-grand-budapest-hotel.jpg`,
      "backgroundUrl": `img/the-grand-budapest-hotel-bg.jpg`,
      "backgroundColor": `#ffffff`,
      "videoLink": `https://some-link`,
      "previewVideoLink": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scoresCount": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "runTime": 99,
      "genre": `Comedy`,
      "released": 2014,
      "isFavorite": false
    };
    const store = mockStore({
      MOVIE: {
        movie,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          avatarUrl: `http://some-avatart`,
        }
      },
      FILMS: {
        films: [movie],
      }
    });

    const history = createMemoryHistory();
    history.push(`/films/1/review`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it(`renders 'AuthView' when unauthorized user navigate to '/login' url`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const history = createMemoryHistory();
    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it(`renders 'MovieView' when user navigate to '/films/:id' url`, () => {
    const movie = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "posterUrl": `img/the-grand-budapest-hotel-poster.jpg`,
      "previewUrl": `img/the-grand-budapest-hotel.jpg`,
      "backgroundUrl": `img/the-grand-budapest-hotel-bg.jpg`,
      "backgroundColor": `#ffffff`,
      "videoLink": `https://some-link`,
      "previewVideoLink": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scoresCount": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "runTime": 99,
      "genre": `Comedy`,
      "released": 2014,
      "isFavorite": false
    };
    const store = mockStore({
      MOVIE: {
        movie,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          avatarUrl: `http://some-avatart`,
        }
      },
      FILMS: {
        films: [movie],
      }
    });

    const history = createMemoryHistory();
    history.push(`/films/1`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(`The Grand Budapest Hotel`)).toBeInTheDocument();
  });

  it(`renders 'MyListView' when user navigate to '/mylist' url`, () => {
    const movie = {
      "id": 1,
      "name": `The Grand Budapest Hotel`,
      "posterUrl": `img/the-grand-budapest-hotel-poster.jpg`,
      "previewUrl": `img/the-grand-budapest-hotel.jpg`,
      "backgroundUrl": `img/the-grand-budapest-hotel-bg.jpg`,
      "backgroundColor": `#ffffff`,
      "videoLink": `https://some-link`,
      "previewVideoLink": `https://some-link`,
      "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      "rating": 8.9,
      "scoresCount": 240,
      "director": `Wes Andreson`,
      "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
      "runTime": 99,
      "genre": `Comedy`,
      "released": 2014,
      "isFavorite": false
    };
    const store = mockStore({
      FAVORITES: {
        favorites: [movie],
        isFavoritesLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: {
          avatarUrl: `http://some-avatart`,
        }
      },
    });

    const history = createMemoryHistory();
    history.push(`/mylist`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
  });

  it(`renders 'PlayerView' when user navigate to '/player/:id' url`, () => {
    const store = mockStore({
      MOVIE: {
        movie: {
          "id": 1,
          "name": `The Grand Budapest Hotel`,
          "posterUrl": `img/the-grand-budapest-hotel-poster.jpg`,
          "previewUrl": `img/the-grand-budapest-hotel.jpg`,
          "backgroundUrl": `img/the-grand-budapest-hotel-bg.jpg`,
          "backgroundColor": `#ffffff`,
          "videoLink": `https://some-link`,
          "previewVideoLink": `https://some-link`,
          "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
          "rating": 8.9,
          "scoresCount": 240,
          "director": `Wes Andreson`,
          "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
          "runTime": 99,
          "genre": `Comedy`,
          "released": 2014,
          "isFavorite": false
        }
      }
    });

    const history = createMemoryHistory();
    history.push(`/player/1`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it(`renders 'NotFoundView' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`Page Not Found`)).toBeInTheDocument();
    expect(screen.getByText(`Go to the`)).toBeInTheDocument();
  });
});

