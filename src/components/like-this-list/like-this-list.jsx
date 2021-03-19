import React from 'react';
import {connect} from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import {FILMS_PROPS} from '../../utils/proptypes';
import {getLikeThisFilms} from '../../store/films/selectors';

const LikeThisList = ({likeThisFilms}) => {

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <MoviesList films={likeThisFilms}/>
    </section>
  );
};

LikeThisList.propTypes = {
  likeThisFilms: FILMS_PROPS,
};

const mapStateToProps = (state) => ({
  likeThisFilms: getLikeThisFilms(state),
});

export {LikeThisList};
export default connect(mapStateToProps, null)(LikeThisList);
