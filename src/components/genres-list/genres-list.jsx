import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectGenre} from '../../store/action';
import Genre from '../genre/genre';
import {getUniqueGenres} from '../../utils/helpers';
import {FILMS_PROPS} from '../../utils/proptypes';
import {getSelectedGenre} from '../../store/settings/selectors';
import {getFilms} from '../../store/films/selectors';

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
  genre: getSelectedGenre(state),
  films: getFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSelectGenre(genre) {
    dispatch(selectGenre(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
