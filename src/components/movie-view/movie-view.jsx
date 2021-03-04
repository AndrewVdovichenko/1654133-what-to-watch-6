import React from 'react';
import {Link, useParams} from 'react-router-dom';

import Footer from '../footer/footer';
import LikeThisList from '../like-this-list/like-this-list';

import {RATING, FILMS_PROPS} from '../../utils';

const getTextRating = (num) => {
  const intNum = Math.floor(num);
  for (const [key, value] of Object.entries(RATING)) {
    if (value.includes(intNum)) {
      return key;
    }
  }
  return `unknown`;
};

const MovieView = (props) => {
  const movieId = useParams().id;
  const movie = props.films[useParams().id - 1];
  const likeThisFilms = props.films.filter((film) => film.genre === movie.genre && film.id !== movie.id).slice(0, 4);

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
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <a href="#" className="movie-nav__link">Overview</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="movie-rating">
                <div className="movie-rating__score">{movie.rating.toLocaleString()}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{getTextRating(movie.rating)}</span>
                  <span className="movie-rating__count">{movie.scoresCount.toLocaleString()} ratings</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{movie.description}</p>
                <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

                <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        {<LikeThisList films={likeThisFilms}/>}

        {<Footer link={`main.html`} />}
      </div>
    </React.Fragment>
  );
};

MovieView.propTypes = {
  films: FILMS_PROPS,
};

export default MovieView;
