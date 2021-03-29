import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectGenre} from '../../store/action';
import Genre from '../genre/genre';
import {getUniqueGenres} from '../../utils/helpers';

const GenresList = () => {
  const films = useSelector((state) => state.FILMS.films);
  const selectedGenre = useSelector((state) => state.SETTINGS.genre);
  const uniqueGenres = getUniqueGenres(films);

  const dispatch = useDispatch();

  const handleSelectGenre = (genre) => {
    dispatch(selectGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((title) => <Genre title={title} key={title} isActive={title === selectedGenre} onSelectGenre={handleSelectGenre} />)}
    </ul>
  );
};

export default GenresList;
