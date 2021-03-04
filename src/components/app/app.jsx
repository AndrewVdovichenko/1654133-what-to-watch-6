import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainView from '../main-view/main-view';
import AddReviewView from '../add-review-view/add-review-view';
import AuthView from '../auth-view/auth-view';
import MovieView from '../movie-view/movie-view';
import MyListView from '../my-list-view/my-list-view';
import NotFoundView from '../not-found-view/not-found-view';
import PlayerView from '../player-view/player-view';
import {MOVIE_PROPS, FILMS_PROPS, REVIEWS_PROPS, USERS_PROPS} from '../../utils';

const App = (props) => {
  const myMovies = props.films.filter((movie) => movie.isFavorite === true);
  const promo = props.promo;
  const films = props.films;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainView
            promo={promo}
          />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReviewView films={films}/>
        </Route>
        <Route exact path="/login">
          <AuthView />
        </Route>
        <Route exact path="/films/:id">
          <MovieView films={films} />
        </Route>
        <Route exact path="/mylist">
          <MyListView myMovies={myMovies}/>
        </Route>
        <Route exact path="/player/:id" >
          <PlayerView films={films}/>
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promo: MOVIE_PROPS,
  films: FILMS_PROPS,
  reviews: REVIEWS_PROPS,
  users: USERS_PROPS,
};

export default App;
