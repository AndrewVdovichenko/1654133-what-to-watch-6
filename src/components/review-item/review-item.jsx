import React from 'react';
import dayjs from 'dayjs';
import {REVIEW_PROPS} from '../../utils/proptypes';

const ReviewItem = ({review}) => {
  const {comment, rating, user, date} = review;
  const visibleDate = dayjs(date).format(`MMMM DD, YYYY`);
  const machineDate = dayjs(date).format(`YYYY-MM-DD`);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={machineDate}>{visibleDate}</time>
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
