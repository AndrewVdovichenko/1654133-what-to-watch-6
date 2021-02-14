import React from 'react';
import PropTypes from 'prop-types';
import {MOVIE_PROPS} from '../../const';

const SmallMovieCard = (props) => {
  const {name, previewUrl, id} = props.movie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        props.onHover(id);
      }}
      onMouseLeave={() => {
        props.onHover(-1);
      }}>
      <div className="small-movie-card__image">
        <img src={previewUrl} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={`/films/${id}`}>{name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: MOVIE_PROPS,
  onHover: PropTypes.func,
};

export default SmallMovieCard;
