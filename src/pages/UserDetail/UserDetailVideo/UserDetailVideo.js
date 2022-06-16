import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';
import { BiLockAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import styles from './UserDetailVideo.module.scss';
import modalSlice from '~/redux/modalSlice';
import videosSlice from '~/redux/videosSlice';

function UserDetailVideo({ video, index }) {
    const videoRef = useRef();
    const dispatch = useDispatch();

    const handleHoverVideo = () => {
        videoRef.current.play();
    };

    const handleUnHoverVideo = () => {
        videoRef.current.pause();
    };

    const handleClick = () => {
        dispatch(modalSlice.actions.setModalVideoDetail(true));
        dispatch(videosSlice.actions.setIndexCurrentVideo(index));
        dispatch(videosSlice.actions.setCurrentTimeVideo(videoRef.current.currentTime));
    };
    return (
        <Link
            to={`#`}
            className={styles.userDetailItem}
            onMouseEnter={handleHoverVideo}
            onMouseLeave={handleUnHoverVideo}
            onClick={handleClick}
        >
            <div className={styles.userDetailItemVideo}>
                <video ref={videoRef} key={video.url} loop muted playsInline>
                    <source src={video.url} type="video/mp4" />
                </video>
            </div>
            <div className={styles.userDetailItemVideoAction}>
                <div className={styles.userDetailItemVideoActionPlay}>
                    <button className={styles.userDetailItemVideoActionPlayBtn}>
                        <BsPlay />
                    </button>
                    <span className={styles.userDetailItemVideoActionPlayView}>{video.views ? video.views : 0}</span>
                </div>
                {!video.hasPublic && <BiLockAlt className={styles.userDetailItemVideoActionLock} />}
            </div>
            <div className={styles.userDetailItemDescription}>
                <span>{video.description + ' '}</span>
                {video.hastag.map((hashtag, index) => {
                    return (
                        <span to={`#${hashtag}`} className={styles.userDetailItemDescriptionHashtag} key={index}>
                            #{hashtag}
                        </span>
                    );
                })}
            </div>
        </Link>
    );
}

export default UserDetailVideo;
