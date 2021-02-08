import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainView from '../main-view/main-view';
import AddReviewView from '../add-review-view/add-review-view';
import AuthView from '../auth-view/auth-view';
import MovieView from '../movie-view/movie-view';
import MyListView from '../my-list-view/my-list-view';
import NotFoundView from '../not-found-view/not-found-view';
import PlayerView from '../player-view/player-view';
import {MOVIES} from '../../const';

const myMovies = MOVIES.slice(0, 5);

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainView promo={props.promo}/>
        </Route>
        <Route exact path="/films/:id/review">
          <AddReviewView />
        </Route>
        <Route exact path="/login">
          <AuthView />
        </Route>
        <Route exact path="/films/:id">
          <MovieView />
        </Route>
        <Route exact path="/mylist">
          <MyListView myMovies={myMovies}/>
        </Route>
        <Route exact path="/player/:id">
          <PlayerView />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  promo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
  }).isRequired
};

export default App;
