import React from 'react';
import {useSelector} from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import {similarFilmsSelector} from '../../store/films/selectors';

const LikeThisList = () => {
  const films = useSelector(similarFilmsSelector);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <MoviesList films={films}/>
    </section>
  );
};

export default React.memo(LikeThisList);
