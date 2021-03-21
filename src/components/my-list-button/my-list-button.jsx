import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MOVIE_PROPS} from '../../utils/proptypes';
import {addToFavorite, fetchMovie} from '../../store/api-actions';

const MyListButton = (props) => {
  const {id, isFavorite} = props.movie;
  const {onAddToFavorite} = props;

  const addToFavoriteClick = () => {
    const status = !isFavorite ? 1 : 0;
    onAddToFavorite(id, status);
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={() => addToFavoriteClick()}>
      {isFavorite
        ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

MyListButton.propTypes = {
  movie: MOVIE_PROPS,
  onAddToFavorite: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onAddToFavorite(movieId, status) {
    dispatch(addToFavorite(movieId, status));
    dispatch(fetchMovie(movieId));
  }
});

export {MyListButton};
export default connect(null, mapDispatchToProps)(MyListButton);
