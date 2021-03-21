import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/header';
import Logo from '../logo/logo';
import MyListButton from '../my-list-button/my-list-button';
import PlayButton from '../play-button/play-button';
import UserBlock from '../user-block/user-block';
import {getPromo} from '../../store/promo/selectors';
import {PROMO_PROPS} from '../../utils/proptypes';

const PromoCard = ({promo}) => {
  const {name, genre, released, posterUrl, previewUrl, id} = promo;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={previewUrl} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header>
        <Logo />
        <UserBlock />
      </Header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={posterUrl} alt={`${name} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <PlayButton movieId={id} />
              <MyListButton movie={promo} />
            </div>
          </div>
        </div>
      </div>
    </section>);
};

PromoCard.propTypes = {
  promo: PROMO_PROPS,
};

const mapStateToProps = (state) => ({
  promo: getPromo(state),
});

export {PromoCard};
export default connect(mapStateToProps, null)(PromoCard);
