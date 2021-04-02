import React from 'react';
import PropTypes from 'prop-types';

const Unavailable = (props) => {
  return (
    <div>
      <h1>Something went wrong. Please try again later.</h1>
      {props.children}
    </div>
  );
};

Unavailable.propTypes = {
  children: PropTypes.node,
};

export default Unavailable;
