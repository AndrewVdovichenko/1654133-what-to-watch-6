import React from 'react';
import {connect} from 'react-redux';
import {getMovie} from '../../store/movie/selectors';
import {getRuntimeInHoursAndMinutes} from '../../utils/helpers';
import {MOVIE_PROPS} from '../../utils/proptypes';

const MovieDetails = ({movie}) => {
  const {released, genre, director, starring, runTime} = movie;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {starring.map((star) => (<React.Fragment key={star}>{star}<br/></React.Fragment>))}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{getRuntimeInHoursAndMinutes(runTime)}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  movie: MOVIE_PROPS,
};

const mapStateToProps = (state) => ({
  movie: getMovie(state),
});

export {MovieDetails};
export default connect(mapStateToProps, null)(MovieDetails);
