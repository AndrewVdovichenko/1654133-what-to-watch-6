import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import {RATING_STARS} from '../../utils/const';
import {postComment} from '../../store/api-actions';

const AddReviewView = () => {
  const {movie} = useSelector((state) => state.MOVIE);
  const dispatch = useDispatch();

  const [star, setStar] = useState(8);
  const [review, setReview] = useState(``);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postComment(movie.id, {
      rating: star,
      comment: review,
    }));
  };

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={movie.backgroundUrl} alt={movie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={movie.posterUrl} alt={`${movie.name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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

export default AddReviewView;
