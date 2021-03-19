import React from 'react';
import {connect} from 'react-redux';
import {getMovie} from '../../store/movie/selectors';
import {getTextRating} from '../../utils/helpers';
import {MOVIE_PROPS} from '../../utils/proptypes';

const MovieOverview = ({movie}) => {
  const {rating, scoresCount, director, starring} = movie;

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating.toLocaleString()}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getTextRating(rating)}</span>
          <span className="movie-rating__count">{scoresCount.toLocaleString()} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{movie.description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
      </div>
    </>
  );
};

MovieOverview.propTypes = {
  movie: MOVIE_PROPS,
};

const mapStateToProps = (state) => ({
  movie: getMovie(state),
});

export {MovieOverview};
export default connect(mapStateToProps, null)(MovieOverview);
