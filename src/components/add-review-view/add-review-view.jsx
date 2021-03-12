import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {RATING_STARS} from '../../utils/const';
import {FILMS_PROPS} from '../../utils/proptypes';

const AddReviewView = (props) => {
  const movieId = useParams().id;
  const movie = props.films[movieId - 1];

  const [star, setStar] = useState(8);
  const [review, setReview] = useState(``);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${movieId}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterUrl} alt={`${movie.name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {RATING_STARS.map((value) => {
                return (
                  <React.Fragment key={value}>
                    <input
                      className="rating__input"
                      id={`star-${value}`}
                      type="radio"
                      name="rating"
                      value={value}
                      onClick={(evt) => setStar(evt.target.value)}
                      defaultChecked={star === value}
                    />
                    <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={review}
              onChange={(evt) => setReview(evt.target.value)}>
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};

AddReviewView.propTypes = {
  films: FILMS_PROPS,
};

export default AddReviewView;
