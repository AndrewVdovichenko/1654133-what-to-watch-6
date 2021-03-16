import React from 'react';
import MoviesList from '../movies-list/movies-list';
import {FILMS_PROPS} from '../../utils/proptypes';

const LikeThisList = ({films}) => {

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      {<MoviesList films={films}/>}
    </section>
  );
};

LikeThisList.propTypes = {
  films: FILMS_PROPS
};

export default LikeThisList;
