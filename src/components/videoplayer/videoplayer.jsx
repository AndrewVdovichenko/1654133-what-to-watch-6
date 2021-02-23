import React from 'react';
import PropTypes from 'prop-types';
import {MOVIE_PROPS} from '../../const';

const Videoplayer = (props) => {
  const {previewVideoLink, previewUrl} = props.movie;
  const [height, width] = props.size;
  return (
    <video controls
      src={previewVideoLink}
      poster={previewUrl}
      muted={true}
      autoPlay={true}
      height={height}
      width={width}>
        Sorry, your browser does not support embedded video.
    </video>
  );
};

Videoplayer.propTypes = {
  movie: MOVIE_PROPS,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Videoplayer;
