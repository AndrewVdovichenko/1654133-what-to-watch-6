import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import Unavailable from './components/unavailable/unavailable';
import reducer from './store/reducer';
import {requireAuthorization} from './store/action';
import {checkAuth, fetchFilmsList} from "./store/api-actions";
import {AuthorizationStatus} from "./utils/const";
import {redirect} from './store/middlewares/redirect';
import browserHistory from './browser-history';

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    ),
);

const initApp = async () => {
  try {
    await store.dispatch(checkAuth());
    await store.dispatch(fetchFilmsList());

    ReactDOM.render(
        <Provider store={store}>
          <Router history={browserHistory}>
            <App />
          </Router>
        </Provider>,
        document.querySelector(`#root`)
    );
  } catch (error) {
    ReactDOM.render(
        <Unavailable>
          {error.toString()}
        </Unavailable>,
        document.querySelector(`#root`)
    );
  }
};

initApp();
