import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSelectedGenre} from '../../store/settings/selectors';

const Genre = (props) => {
  const {title, genre, onSelectGenre} = props;
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
  genre: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: getSelectedGenre(state),
});

export {Genre};
export default connect(mapStateToProps, null)(Genre);
