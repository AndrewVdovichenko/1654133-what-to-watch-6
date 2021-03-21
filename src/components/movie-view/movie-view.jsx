import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import LikeThisList from '../like-this-list/like-this-list';
import LoadingView from '../loading-view/loading-view';
import Logo from '../logo/logo';
import MovieDetails from '../movie-details/movie-details';
import MovieOverview from '../movie-overview/movie-overview';
import MovieReview from '../movie-review/movie-review';
import MovieTabs from '../movie-tabs/movie-tabs';
import MyListButton from '../my-list-button/my-list-button';
import PlayButton from '../play-button/play-button';
import UserBlock from '../user-block/user-block';
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

          <Header>
            <Logo />
            <UserBlock />
          </Header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <PlayButton movieId={movie.id} />
                <MyListButton movie={movie} />
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
  onAddToFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId) {
    dispatch(fetchMovie(movieId));
    dispatch(fetchComments(movieId));
  }
});

export {MovieView};
export default connect(mapStateToProps, mapDispatchToProps)(MovieView);
