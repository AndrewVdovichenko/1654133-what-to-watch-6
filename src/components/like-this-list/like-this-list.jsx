import React from 'react';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import {FILMS_PROPS} from '../../utils/proptypes';
import {similarFilmsSelector} from '../../store/films/selectors';

const LikeThisList = ({films}) => {

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <MoviesList films={films}/>
    </section>
  );
};

LikeThisList.propTypes = {
  films: FILMS_PROPS,
};

const mapStateToProps = (state) => ({
  films: similarFilmsSelector(state),
});

export {LikeThisList};
export default connect(mapStateToProps, null)(LikeThisList);
