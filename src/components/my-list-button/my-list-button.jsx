import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {MOVIE_PROPS} from '../../utils/proptypes';
import {addToFavorite} from '../../store/api-actions';
import {AuthorizationStatus} from '../../utils/const';
import {redirectToRoute} from '../../store/action';

const MyListButton = (props) => {
  const {id, isFavorite} = props.movie;
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const authorizationStatus = useSelector((state) => state.USER.authorizationStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    setButtonDisabled(false);
  }, [isFavorite]);

  const handleAddToFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      dispatch(redirectToRoute(`/login`));
      return;
    }

    const status = !isFavorite ? 1 : 0;

    const updateFavoriteStatus = () => {
      setButtonDisabled(true);

      dispatch(addToFavorite(id, status))
        .then(() => dispatch(props.onAfterClick));
    };

    updateFavoriteStatus();
  };

  return (
    <button className="btn btn--list movie-card__button" type="button" onClick={handleAddToFavoriteClick} disabled={buttonDisabled}>
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

export default React.memo(MyListButton);
