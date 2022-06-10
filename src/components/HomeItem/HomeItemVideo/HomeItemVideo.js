import styles from "./HomeItemVideo.module.scss";
import modalSlice from "~/redux/modalSlice";

import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import videosSlice from "~/redux/videosSlice";

function HomeItemVideo({ index, video, user }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [showPlayBtn, setShowPlayBtn] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [valueSliderVolume, setValueSliderVolume] = useState(50);
  const dispatch = useDispatch();

  const videoRef = useRef();

  const handlePlayOrPauseVideo = () => {
    if (isPlay) {
      videoRef.current.pause();
      setIsPlay(false);
    } else {
      videoRef.current.play();
      setIsPlay(true);
    }
  };

  const handleClickVolumeBtn = () => {
    if (isMute) {
      videoRef.current.muted = false;
      setIsMute(false);
    } else {
      videoRef.current.muted = true;
      setIsMute(true);
    }
  };

  const handleHoverVideo = () => {
    setShowPlayBtn(true);
  };
  const handleUnHoverVideo = () => {
    setShowPlayBtn(false);
  };

  const handleHoverVolumeBtn = () => {
    setShowVolumeSlider(true);
  };
  const handleUnHoverVolumeBtn = () => {
    setShowVolumeSlider(false);
  };

  const handleVolumeSlider = (e) => {
    setValueSliderVolume(+e.target.value);
    videoRef.current.volume = valueSliderVolume / 100;
    if (valueSliderVolume === 10) {
      //=10 vi loi thanh truot
      videoRef.current.muted = true;
      setIsMute(true);
    } else {
      videoRef.current.muted = false;
      setIsMute(false);
    }
  };

  const handleClickVideo = () => {
    dispatch(modalSlice.actions.setModalVideoDetail(true));
    dispatch(videosSlice.actions.setIndexCurrentVideo(index));
  }
  
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleHoverVideo}
      onMouseLeave={handleUnHoverVideo}
    >
      <div className={styles.video}>
        <Link to={`@${user.tiktokid}/video/${video.id}`} onClick={handleClickVideo}>
          <video ref={videoRef} key={video.url} loop muted playsInline>
            <source src={video.url} type="video/mp4" />
          </video>
        </Link>
      </div>

      <div className={styles.videoControls}>
        <div className={styles.videoControlsPlayBtn}>
          <button
            style={showPlayBtn ? { display: "block" } : { display: "none" }}
            className={styles.videoControlsPlayBtn}
            onClick={handlePlayOrPauseVideo}
          >
            {isPlay ? <BsPauseFill /> : <BsFillPlayFill />}
          </button>
        </div>

        <div
          className={styles.videoControlsVolume}
          onMouseEnter={handleHoverVolumeBtn}
          onMouseLeave={handleUnHoverVolumeBtn}
        >
          <button
            className={styles.videoControlsVolumeBtn}
            onClick={handleClickVolumeBtn}
          >
            {isMute ? <HiVolumeOff /> : <HiVolumeUp />}
          </button>

          {showVolumeSlider && (
            <div className={styles.videoControlsVolumeSlider}>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={valueSliderVolume}
                onChange={handleVolumeSlider}
              ></input>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeItemVideo;
