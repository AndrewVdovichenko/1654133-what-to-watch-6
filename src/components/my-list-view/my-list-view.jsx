import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoadingView from '../loading-view/loading-view';
import Logo from '../logo/logo';
import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import UserBlock from '../user-block/user-block';
import {FILMS_PROPS} from '../../utils/proptypes';
import {getFavorites, getLoadedFavoritesStatus} from '../../store/favorites/selectors';
import {fetchFavorites} from '../../store/api-actions';

const MyListView = (props) => {
  const {myMovies, isFavoritesLoaded, onLoadFavorites} = props;

  useEffect(() => {
    if (!isFavoritesLoaded) {
      onLoadFavorites();
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

MyListView.propTypes = {
  myMovies: FILMS_PROPS,
  isFavoritesLoaded: PropTypes.bool.isRequired,
  onLoadFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myMovies: getFavorites(state),
  isFavoritesLoaded: getLoadedFavoritesStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorites() {
    dispatch(fetchFavorites());
  }
});

export {MyListView};
export default connect(mapStateToProps, mapDispatchToProps)(MyListView);
