import React from 'react';
import Logo from '../logo/logo';

const Footer = () => {
  return (
    <footer className="page-footer">
      <Logo isLight={true}/>

      <div className="copyright">
        <p>© {new Date().getFullYear()} What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
