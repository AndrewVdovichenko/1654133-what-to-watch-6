import React from 'react';
import {connect} from 'react-redux';
import {getComments} from '../../store/movie/selectors';
import {REVIEWS_PROPS} from '../../utils/proptypes';
import ReviewItem from '../review-item/review-item';

const MovieReview = ({comments}) => {
  const leftColumnReviews = comments.filter((_, key) => key % 2);
  const rightColumnReviews = comments.filter((_, key) => !(key % 2));

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

MovieReview.propTypes = {
  comments: REVIEWS_PROPS,
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

export {MovieReview};
export default connect(mapStateToProps, null)(MovieReview);
