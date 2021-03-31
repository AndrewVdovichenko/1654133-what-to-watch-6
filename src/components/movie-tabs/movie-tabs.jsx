import React from 'react';
import PropTypes from 'prop-types';
import {MOVIE_PAGE_TABS} from '../../utils/const';

const MovieTabs = ({activeTab, onChangeTab}) => {

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {Object.values(MOVIE_PAGE_TABS).map((tab) =>
          <li className={
            activeTab === tab
              ? `movie-nav__item movie-nav__item--active`
              : `movie-nav__item`
          }
          key={tab}>
            <a href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onChangeTab(tab);
              }}>
              {tab}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

MovieTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};

export default React.memo(MovieTabs);
