import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = ({isLight}) => {
  return (
    <div className="logo">
      <Link to="/" className={`logo__link ${isLight ? `logo__link--light` : ``}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  isLight: PropTypes.bool,
};

export default React.memo(Logo);
