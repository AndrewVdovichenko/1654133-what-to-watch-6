import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const PlayButton = ({movieId}) => {
  const history = useHistory();

  return (
    <button className="btn btn--play movie-card__button" type="button"
      onClick={() => {
        history.push(`/player/${movieId}`);
      }}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
};

PlayButton.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default PlayButton;
