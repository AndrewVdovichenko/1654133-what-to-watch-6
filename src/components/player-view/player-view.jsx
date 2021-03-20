import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import LoadingView from '../loading-view/loading-view';
import {fetchMovie} from '../../store/api-actions';
import {getMovie} from '../../store/movie/selectors';
import {MOVIE_PROPS} from '../../utils/proptypes';
import {SECONDS_IN_MINUTE} from '../../utils/const';
import {getFormattedRemainingTime} from '../../utils/helpers';

const PlayerView = (props) => {
  const movieId = useParams().id;
  const {movie, onLoadMovie} = props;
  const isNeedLoading = movieId !== movie.id.toString();

  const video = useRef(null);
  const playerControls = useRef(null);
  const fullscreenButton = useRef(null);

  const [player, setPlayer] = useState({
    paused: true,
    duration: null,
    currentTime: null,
  });

  useEffect(() => {
    if (isNeedLoading) {
      onLoadMovie(movieId);
    } else {
      setPlayer({
        ...player,
        duration: movie.runTime * SECONDS_IN_MINUTE,
        currentTime: 0,
      });
    }
  }, [isNeedLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer({
        ...player,
        currentTime: video.current.currentTime,
      });
    }, 500);

    return () => clearInterval(interval);
  });

  if (isNeedLoading) {
    return <LoadingView />;
  }


  const onPlayClick = () => {
    if (player.paused) {
      video.current.play();
      setPlayer({
        ...player,
        paused: false,
        duration: video.current.duration,
      });
    } else {
      video.current.pause();
      setPlayer({
        ...player,
        paused: true,
      });
    }
  };

  const togglerStyle = {
    left: player.currentTime / player.duration * 100 + `%`,
  };

  return (
    <div className="player">
      <video ref={video} src={movie.videoLink} className="player__video" poster={movie.previewUrl}></video>

      <Link to={`/films/${movieId}`} >
        <button type="button" className="player__exit">Exit</button>
      </Link>
      <div className="player__controls" ref={playerControls}>
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={player.currentTime} min={0} max={player.duration}></progress>
            <div className="player__toggler" style={togglerStyle}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormattedRemainingTime(Math.floor(player.duration - player.currentTime))}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayClick}>
            {player.paused
              ? (
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </>
              )
              : (
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
              )
            }
          </button>
          <div className="player__name">{movie.name}</div>

          <button type="button" className="player__full-screen" ref={fullscreenButton}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  movie: MOVIE_PROPS,
  onLoadMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMovie(movieId) {
    dispatch(fetchMovie(movieId));
  },
});

export {PlayerView};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerView);
