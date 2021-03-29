import React from 'react';
import {useSelector} from 'react-redux';
import ReviewItem from '../review-item/review-item';

const MovieReview = () => {
  const comments = useSelector((state) => state.MOVIE.comments);

  const rightColumnReviews = comments.filter((_, key) => key % 2);
  const leftColumnReviews = comments.filter((_, key) => !(key % 2));

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftColumnReviews.map((comment) => <ReviewItem review={comment} key={comment.id}/>)}
      </div>
      <div className="movie-card__reviews-col">
        {rightColumnReviews.map((comment) => <ReviewItem review={comment} key={comment.id}/>)}
      </div>
    </div>
  );
};

export default MovieReview;
