import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promo = {
  name: `The Grand Budapest Hotel`,
  posterUrl: `img/the-grand-budapest-hotel-poster.jpg`,
  genre: `Drama`,
  released: 2014,
};

ReactDOM.render(
    <App promo={promo}/>,
    document.querySelector(`#root`)
);
