import React, {useState} from 'react';
import SmallMovieCard from '../small-movie-card/small-movie-card';
import {FILMS_PROPS} from '../../utils';

const MoviesList = ({films}) => {
  const [activeMovie, setActiveMovie] = useState(-1);

  return (
    <div className="catalog__movies-list">
      {films.map((movie) => <SmallMovieCard key={movie.id} movie={movie} onHover={setActiveMovie} />)}
    </div>
  );
};

MoviesList.propTypes = {
  films: FILMS_PROPS,
};

export default MoviesList;
