import React from 'react';
import {useDispatch} from 'react-redux';
import {showMore} from '../../store/action';

const ShowMore = () => {
  const dispatch = useDispatch();

  const handleShowMoreButtonClick = () => {
    dispatch(showMore());
  };

  return (
    <div className="catalog__more" onClick={handleShowMoreButtonClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ShowMore;
