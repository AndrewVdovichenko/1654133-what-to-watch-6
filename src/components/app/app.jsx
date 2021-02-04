import React from 'react';
import PropTypes from 'prop-types';
import MainView from '../main-view/main-view';

const App = (props) => {
  return (
    <MainView promo={props.promo}/>
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
