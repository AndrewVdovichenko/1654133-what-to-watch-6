import React from 'react';
import {MOVIE_PROPS} from '../../utils';

const Videoplayer = (props) => {
  const {previewVideoLink, previewUrl} = props.movie;

  return (
    <video controls
      src={previewVideoLink}
      poster={previewUrl}
      muted={true}
      autoPlay={true}
      width={`100%`}>
        Sorry, your browser does not support embedded video.
    </video>
  );
};

Videoplayer.propTypes = {
  movie: MOVIE_PROPS,
};

export default Videoplayer;
