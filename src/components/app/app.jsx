import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import MainView from '../main-view/main-view';
import AddReviewView from '../add-review-view/add-review-view';
import AuthView from '../auth-view/auth-view';
import MovieView from '../movie-view/movie-view';
import MyListView from '../my-list-view/my-list-view';
import NotFoundView from '../not-found-view/not-found-view';
import PlayerView from '../player-view/player-view';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainView />
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
          <MyListView />
        </Route>
        <Route exact path="/player/:id" >
          <PlayerView />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
