import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import LoadingView from '../loading-view/loading-view';
import {fetchMovie} from '../../store/api-actions';
import {SECONDS_IN_MINUTE, HUNDRED_PERCENT} from '../../utils/const';
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
      const duration = movie.runTime * SECONDS_IN_MINUTE;

      setPlayer({
        ...player,
        duration,
        remainingTime: Math.floor(duration),
        currentTime: 0,
      });
    }
  }, [isNeedLoading]);

  if (isNeedLoading) {
    return <LoadingView />;
  }

  const handleMetadataLoaded = () => {
    setPlayer({
      ...player,
      duration: video.current.duration,
      remainingTime: Math.floor(video.current.duration),
    });
  };

  const handleTimeUpdate = () => {
    const videoPlayer = video.current;
    const currentTime = videoPlayer.currentTime;

    setPlayer({
      ...player,
      currentTime,
      remainingTime: Math.floor(player.duration - currentTime),
    });
  };

  const isFullscreen = () => {
    return !!(document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement);
  };

  const handleFullscreenButtonClick = () => {
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

  const handlePlayButtonClick = () => {
    const videoPlayer = video.current;

    if (videoPlayer.paused || videoPlayer.ended) {
      videoPlayer.play();
      setPlayer({
        ...player,
        paused: false,
        duration: video.current.duration,
      });
    } else {
      videoPlayer.pause();
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
      <video ref={video} src={movie.videoLink} className="player__video" poster={movie.previewUrl} preload="metadata"
        onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleMetadataLoaded}></video>

      <button type="button" className="player__exit" onClick={() => {
        history.push(`/films/${movieId}`);
      }}>Exit</button>

      <div className="player__controls" ref={playerControls}>
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={player.currentTime} min={0} max={player.duration || 0}></progress>
            <div className="player__toggler" style={togglerStyle}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormattedRemainingTime(player.remainingTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayButtonClick}>
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

          <button type="button" className="player__full-screen" onClick={handleFullscreenButtonClick}>
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
