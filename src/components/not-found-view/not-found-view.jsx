import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundView = () => {
  return (
    <React.Fragment>
      <h1>Page Not Found</h1>
      <p>Go to the <Link to="/">main page</Link></p>
    </React.Fragment>
  );
};

export default NotFoundView;
