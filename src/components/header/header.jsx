import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <header className="page-header movie-card__head">
      {props.children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
