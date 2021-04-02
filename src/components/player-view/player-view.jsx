import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import LoadingView from '../loading-view/loading-view';
import {fetchMovie} from '../../store/api-actions';
import {SECONDS_IN_MINUTE, INTERVAL_TO_UPDATE_PLAYER_INFO, HUNDRED_PERCENT} from '../../utils/const';
import {getFormattedRemainingTime} from '../../utils/helpers';

const PlayerView = () => {
  const movieId = useParams().id;
  const movie = useSelector((state) => state.MOVIE.movie);
  const isNeedLoading = movieId !== movie.id.toString();

  const video = useRef(null);
  const playerControls = useRef(null);

  const history = useHistory();

  const [player, setPlayer] = useState({
    paused: true,
    duration: null,
    currentTime: null,
    remainingTime: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNeedLoading) {
      dispatch(fetchMovie(movieId));
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
      const currentTime = video.current.currentTime;
      setPlayer({
        ...player,
        currentTime,
        remainingTime: Math.floor(player.duration - currentTime),
      });
    }, INTERVAL_TO_UPDATE_PLAYER_INFO);

    return () => clearInterval(interval);
  });

  if (isNeedLoading) {
    return <LoadingView />;
  }

  const isFullscreen = () => {
    return !!(document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement);
  };

  const openFullscreen = () => {
    if (!video.current) {
      return;
    }
    const videoPlayer = video.current;

    if (isFullscreen()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
      } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
      } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
      }
    }
  };

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
    left: player.currentTime / player.duration * HUNDRED_PERCENT + `%`,
  };

  return (
    <div className="player">
      <video ref={video} src={movie.videoLink} className="player__video" poster={movie.previewUrl} preload="metadata"></video>

      <button type="button" className="player__exit" onClick={() => {
        history.push(`/films/${movieId}`);
      }}>Exit</button>

      <div className="player__controls" ref={playerControls}>
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={player.currentTime} min={0} max={player.duration}></progress>
            <div className="player__toggler" style={togglerStyle}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormattedRemainingTime(player.remainingTime)}</div>
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

          <button type="button" className="player__full-screen" onClick={openFullscreen}>
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

export default PlayerView;
