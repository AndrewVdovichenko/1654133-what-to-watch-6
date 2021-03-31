import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Videoplayer from '../videoplayer/videoplayer';
import {PAUSE_BEFORE_AUTOPLAY} from '../../utils/const';
import {MOVIE_PROPS} from '../../utils/proptypes';

const SmallMovieCard = (props) => {
  const [isVideoplayerActive, setVideoplayerActive] = useState(false);
  const timer = useRef(null);
  const {name, previewUrl, id} = props.movie;

  useEffect(() => {
    let mounted = true;

    return () => {
      if (mounted) {
        clearTimeout(timer.current);
        mounted = false;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => {
      setVideoplayerActive(true);
    }, PAUSE_BEFORE_AUTOPLAY);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer.current);
    setVideoplayerActive(false);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="small-movie-card__image">
        {isVideoplayerActive
          ? <Videoplayer movie={props.movie} />
          : <img src={previewUrl} alt={name} width="280" height="175" />}
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: MOVIE_PROPS,
};

export default SmallMovieCard;
