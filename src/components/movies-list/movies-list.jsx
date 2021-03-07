import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {FILMS_PROPS} from '../../utils';

const MoviesList = ({films, showed}) => {
  const [activeMovie, setActiveMovie] = useState(-1);
  const filmsToShow = films.slice(0, showed);

  return (
    <div className="catalog__movies-list">
      {filmsToShow.map((movie) => <SmallMovieCard key={movie.id} movie={movie} onHover={setActiveMovie} />)}
    </div>
  );
};

MoviesList.propTypes = {
  films: FILMS_PROPS,
  showed: PropTypes.number.isRequired,
};

export default MoviesList;
