import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {MOVIES} from './mocks/films';
import {REVIEWS} from './mocks/reviews';
import {USERS} from './mocks/users';
import {reducer} from './store/reducer';

const PROMO = MOVIES[19];

const store = createStore(
    reducer,
    composeWithDevTools(),
);

ReactDOM.render(
    <Provider store={store}>
      <App
        promo={PROMO}
        films={MOVIES}
        reviews={REVIEWS}
        users={USERS}
      />
    </Provider>,
    document.querySelector(`#root`)
);
