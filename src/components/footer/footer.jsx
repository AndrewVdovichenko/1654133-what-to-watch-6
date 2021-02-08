import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({link}) => {
  return (
    <footer className="page-footer">
      <div className="logo">
        <a href={link} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© {new Date().getFullYear()} What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  link: PropTypes.string,
};

export default Footer;
