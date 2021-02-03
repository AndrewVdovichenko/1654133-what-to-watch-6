import React from 'react';

const SmallMovieCard = (props) => {
  const {title, posterUrl, pageUrl} = props.movie;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={posterUrl} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={pageUrl}>{title}</a>
      </h3>
    </article>
  );
};

export default SmallMovieCard;
