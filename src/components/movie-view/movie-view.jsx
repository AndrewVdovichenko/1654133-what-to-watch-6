import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import LoadingView from '../loading-view/loading-view';
import MovieTabs from '../movie-tabs/movie-tabs';
import Footer from '../footer/footer';
import LikeThisList from '../like-this-list/like-this-list';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReview from '../movie-review/movie-review';
import MovieDetails from '../movie-details/movie-details';
import {getMovie} from '../../store/movie/selectors';
import {fetchComments, fetchMovie} from '../../store/api-actions';
import {MOVIE_PAGE_TABS} from '../../utils/const';
import {MOVIE_PROPS} from '../../utils/proptypes';

const MovieView = (props) => {
  const movieId = useParams().id;
  const [activeTab, setActiveTab] = useState(MOVIE_PAGE_TABS.OVERVIEW);
  const {movie, onLoadMovie} = props;
  const isNeedLoading = movieId !== movie.id.toString();

  useEffect(() => {
    if (isNeedLoading) {
      onLoadMovie(movieId);
    }
  }, [isNeedLoading]);

  if (isNeedLoading) {
    return <LoadingView />;
  }

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundUrl} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${movieId}/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.posterUrl} alt={`${movie.name} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <MovieTabs activeTab={activeTab} onChangeTab={setActiveTab}/>
              {activeTab === MOVIE_PAGE_TABS.OVERVIEW && <MovieOverview />}
              {activeTab === MOVIE_PAGE_TABS.DETAILS && <MovieDetails />}
              {activeTab === MOVIE_PAGE_TABS.REVIEWS && <MovieReview />}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <LikeThisList />
        <Footer />
      </div>
    </React.Fragment>
  );
};

MovieView.propTypes = {
  movie: MOVIE_PROPS,
  onLoadMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId) {
    dispatch(fetchMovie(movieId));
    dispatch(fetchComments(movieId));
  },
});

export {MovieView};
export default connect(mapStateToProps, mapDispatchToProps)(MovieView);
