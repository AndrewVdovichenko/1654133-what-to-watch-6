import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {MOVIES} from './mocks/films';
import {REVIEWS} from './mocks/reviews';
import {USERS} from './mocks/users';

const PROMO = MOVIES[19];

ReactDOM.render(
    <App
      promo={PROMO}
      films={MOVIES}
      reviews={REVIEWS}
      users={USERS}
    />,
    document.querySelector(`#root`)
);
