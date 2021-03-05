import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../store/action';
import Genre from '../genre/genre';
import {getUniqueGenres} from '../../logic';
import {FILMS_PROPS} from '../../utils';

const GenresList = (props) => {
  const {films, genre, onSelectGenre} = props;
  const uniqueGenres = getUniqueGenres(films);

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((title) => <Genre title={title} key={title} isActive={title === genre} onSelectGenre={onSelectGenre} />)}
    </ul>
  );
};

GenresList.propTypes = {
  films: FILMS_PROPS,
  genre: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  films: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectGenre(genre) {
    dispatch(ActionCreator.selectGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
