import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './HomeItemVideo.module.scss';
import modalSlice from '~/redux/modalSlice';
import videosSlice from '~/redux/videosSlice';
import { videosSelector } from '~/redux/selectors';

function HomeItemVideo({ index, video }) {
    const dispatch = useDispatch();
    const [isPlay, setIsPlay] = useState(false);
    const [showPlayBtn, setShowPlayBtn] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [valueSliderVolume, setValueSliderVolume] = useState(50);
    const { volumeVideo } = useSelector(videosSelector);

    const videoRef = useRef();

    useEffect(() => {
        setValueSliderVolume(volumeVideo * 100);
        videoRef.current.volume = volumeVideo;
        //paused video when switch tab browser or minimize
        // document.addEventListener('visibilitychange', function () {
        //     if (document.hidden) {
        //         // videoRef.current.pause();
        //     } else {
        //         // videoRef.current.play();
        //     }
        // });
    }, [videoRef, volumeVideo]);

    useEffect(() => {
        //auto play when scroll to video
        let options = {
            rootMargin: '0px',
            threshold: [0.6, 1],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlay(true);
                } else {
                    videoRef.current.pause();
                    setIsPlay(false);
                }
            });
        };
        let observer = new IntersectionObserver(handlePlay, options);
        observer.observe(videoRef.current);
    }, [videoRef])

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
        if (videoRef.current.volume === 0) {
            videoRef.current.volume = 50 / 100;
            dispatch(videosSlice.actions.setVolumnVideo(0.5));
            setValueSliderVolume(50);
        } else {
            videoRef.current.volume = 0;
            dispatch(videosSlice.actions.setVolumnVideo(0));
            setValueSliderVolume(0);
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
        videoRef.current.volume = +e.target.value / 100;
    };

    const handleClickVideo = () => {
        dispatch(modalSlice.actions.setModalVideoDetail(true));
        dispatch(videosSlice.actions.setIndexCurrentVideo(index));
        dispatch(videosSlice.actions.setCurrentTimeVideo(videoRef.current.currentTime));

        videoRef.current.pause();
        setIsPlay(false);
    };

    return (
        <div className={styles.wrapper} onMouseEnter={handleHoverVideo} onMouseLeave={handleUnHoverVideo}>
            <div className={styles.video}>
                <Link to={`#`} onClick={handleClickVideo}>
                    <video ref={videoRef} key={video.url} loop playsInline>
                        <source src={video.url} type="video/mp4" />
                    </video>
                </Link>
            </div>

            <div className={styles.videoControls}>
                <div className={styles.videoControlsPlayBtn}>
                    <button
                        style={showPlayBtn ? { display: 'block' } : { display: 'none' }}
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
                    <button className={styles.videoControlsVolumeBtn} onClick={handleClickVolumeBtn}>
                        {valueSliderVolume === 0 ? <HiVolumeOff /> : <HiVolumeUp />}
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

HomeItemVideo.propTypes = {
    index: PropTypes.number.isRequired,
    video: PropTypes.object.isRequired,
};

export default HomeItemVideo;
