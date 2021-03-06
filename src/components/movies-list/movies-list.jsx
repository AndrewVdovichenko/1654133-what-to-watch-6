import React from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {FILMS_PROPS} from '../../utils/proptypes';

const MoviesList = ({films, showed}) => {
  const filmsToShow = films.slice(0, showed);

  return (
    <div className="catalog__movies-list">
      {filmsToShow.map((movie) => <SmallMovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

MoviesList.propTypes = {
  films: FILMS_PROPS,
  showed: PropTypes.number,
};

export default MoviesList;
