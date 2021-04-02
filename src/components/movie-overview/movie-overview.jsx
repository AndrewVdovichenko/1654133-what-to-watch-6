import React from 'react';
import {useSelector} from 'react-redux';
import {getTextRating} from '../../utils/helpers';

const MovieOverview = () => {
  const {rating, scoresCount, director, starring, description} = useSelector((state) => state.MOVIE.movie);

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
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
      </div>
    </>
  );
};

export default MovieOverview;
