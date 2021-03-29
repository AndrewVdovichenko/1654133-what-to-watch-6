import React from 'react';
import {useDispatch} from 'react-redux';
import {MOVIE_PROPS} from '../../utils/proptypes';
import {addToFavorite, fetchMovie} from '../../store/api-actions';

const MyListButton = (props) => {
  const {id, isFavorite} = props.movie;

  const dispatch = useDispatch();

  const addToFavoriteClick = () => {
    const status = !isFavorite ? 1 : 0;
    dispatch(addToFavorite(id, status));
    dispatch(fetchMovie(id));
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
};

export default MyListButton;
