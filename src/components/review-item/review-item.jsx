import React from 'react';
import {REVIEW_PROPS} from '../../utils/proptypes';

const ReviewItem = ({review}) => {
  const {comment, rating, user} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating.toLocaleString()}</div>
    </div>
  );
};

ReviewItem.propTypes = {
  review: REVIEW_PROPS,
};

export default ReviewItem;
