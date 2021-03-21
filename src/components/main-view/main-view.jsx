import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import {FILMS_PROPS} from '../../utils/proptypes';
import LoadingView from '../loading-view/loading-view';
import PromoCard from '../promo-card/promo-card';
import {getLoadedPromoStatus} from '../../store/promo/selectors';
import {getLoadedFilmsStatus, filmsFilteredByGenreSelector} from '../../store/films/selectors';
import {getShowedFilmsCount} from '../../store/settings/selectors';

const MainView = (props) => {
  const {films, isDataLoaded, showedFilmsCount} = props;

  if (!isDataLoaded) {
    return <LoadingView />;
  }

  return (
    <React.Fragment>
      <PromoCard />
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
  films: FILMS_PROPS,
  isDataLoaded: PropTypes.bool.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  films: filmsFilteredByGenreSelector(state),
  isDataLoaded: getLoadedFilmsStatus(state) && getLoadedPromoStatus(state),
  showedFilmsCount: getShowedFilmsCount(state),
});

export {MainView};
export default connect(mapStateToProps, null)(MainView);
