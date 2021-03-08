import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainView from '../main-view/main-view';
import AddReviewView from '../add-review-view/add-review-view';
import AuthView from '../auth-view/auth-view';
import MovieView from '../movie-view/movie-view';
import MyListView from '../my-list-view/my-list-view';
import NotFoundView from '../not-found-view/not-found-view';
import PlayerView from '../player-view/player-view';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <MainView />
        </Route>
        <PrivateRoute exact
          path="/films/:id/review"
          render={() => <AddReviewView />}
        />
        <Route exact path="/login">
          <AuthView />
        </Route>
        <Route exact path="/films/:id">
          <MovieView />
        </Route>
        <PrivateRoute exact
          path="/mylist"
          render={() => <MyListView />}
        />
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
