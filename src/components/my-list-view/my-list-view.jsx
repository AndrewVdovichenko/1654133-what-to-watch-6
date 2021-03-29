import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LoadingView from '../loading-view/loading-view';
import Logo from '../logo/logo';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import {fetchFavorites} from '../../store/api-actions';

const MyListView = () => {
  const {favorites: myMovies, isFavoritesLoaded} = useSelector((state) => state.FAVORITES);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded]);

  if (!isFavoritesLoaded) {
    return <LoadingView />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList films={myMovies} />

      </section>

      <Footer link={`main.html`} />
    </div>
  );
};

export default MyListView;
