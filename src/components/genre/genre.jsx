import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const Genre = (props) => {
  const {title, onSelectGenre} = props;
  const genre = useSelector((state) => state.SETTINGS.genre);
  const isActive = title === genre;

  return (
    <li className={
      isActive
        ? `catalog__genres-item catalog__genres-item--active`
        : `catalog__genres-item`}>
      <a
        href="#"
        className="catalog__genres-link"
        onClick={(evt) => {
          evt.preventDefault();
          onSelectGenre(title);
        }}>
        {title}
      </a>
    </li>
  );
};

Genre.propTypes = {
  title: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
};

export default React.memo(Genre);
