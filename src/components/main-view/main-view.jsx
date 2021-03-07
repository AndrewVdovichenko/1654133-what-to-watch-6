import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import {MOVIE_PROPS, FILMS_PROPS} from '../../utils';
import {getSortedFilmsByGenre} from '../../logic';
import {fetchFilmsList, fetchPromoMovie} from '../../store/api-actions';
import LoadingView from '../loading-view/loading-view';

const MainView = (props) => {
  const {films, isDataLoaded, onLoadData, showedFilmsCount} = props;
  const {name, posterUrl, genre, released} = props.promo;

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <LoadingView />;
  }

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterUrl} alt={name + ` poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <MoviesList films={films} showed={showedFilmsCount} />
          {(showedFilmsCount < films.length) && <ShowMore />}
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

MainView.propTypes = {
  promo: MOVIE_PROPS,
  films: FILMS_PROPS,
  isDataLoaded: PropTypes.bool.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
  onLoadData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getSortedFilmsByGenre(state.films, state.genre),
  promo: state.promo,
  isDataLoaded: state.isDataLoaded,
  showedFilmsCount: state.showedFilmsCount,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchPromoMovie());
    dispatch(fetchFilmsList());
  },
});

export {MainView};
export default connect(mapStateToProps, mapDispatchToProps)(MainView);
