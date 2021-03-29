import React from 'react';
import {useSelector} from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import LoadingView from '../loading-view/loading-view';
import PromoCard from '../promo-card/promo-card';
import {filmsFilteredByGenreSelector} from '../../store/films/selectors';

const MainView = () => {
  const films = useSelector(filmsFilteredByGenreSelector);
  const {isFilmsLoaded} = useSelector((state) => state.FILMS);
  const {isPromoLoaded} = useSelector((state) => state.PROMO);
  const {showedFilmsCount} = useSelector((state) => state.SETTINGS);
  const isDataLoaded = isFilmsLoaded && isPromoLoaded;

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

export default MainView;
