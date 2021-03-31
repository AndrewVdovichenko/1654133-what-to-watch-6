import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {MOVIE_PROPS} from '../../utils/proptypes';
import {addToFavorite} from '../../store/api-actions';

const MyListButton = (props) => {
  const {id, isFavorite} = props.movie;

  const dispatch = useDispatch();

  const handleAddToFavoriteClick = () => {
    const status = !isFavorite ? 1 : 0;

    dispatch(addToFavorite(id, status));
    dispatch(props.onAfterClick);
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={handleAddToFavoriteClick}>
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
  onAfterClick: PropTypes.func.isRequired,
};

export default MyListButton;
