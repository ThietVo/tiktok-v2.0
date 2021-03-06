import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './FollowingItem.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import modalSlice from '~/redux/modalSlice';

function FollowingItem({ user }) {
    const dispatch = useDispatch();
    const videoRef = useRef();

    const handleHover = () => {
        user.videos.length > 0 && videoRef.current.play();
    };

    const handleUnHover = () => {
        user.videos.length > 0 && videoRef.current.pause();
    };

    const handleClickFollowBtn = () => {
        dispatch(modalSlice.actions.setModalLogin(true));
    };

    return (
        <div className={styles.wrapper}>
            <Link
                to={`../@${user.tiktokid}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.followingItem}
                onMouseEnter={handleHover}
                onMouseLeave={handleUnHover}
            >
                {user.videos.length > 0 ? (
                    <video ref={videoRef} muted loop className={styles.followingItemVideo}>
                        <source src={user.videos[0].url} type="video/mp4" />
                    </video>
                ) : (
                    <div className={styles.followingItemVideo}></div>
                )}
            </Link>
            <div className={styles.followingItemInfo} onMouseEnter={handleHover} onMouseLeave={handleUnHover}>
                <Link to={`../@${user.tiktokid}`} target="_blank" className={styles.followingItemInfoDescription}>
                    <Avatar urlImg={user.avatar} avatarMedium />
                    <h2 className={styles.followingItemInfoTitle}>{user.tiktokid}</h2>
                    <h3 className={styles.followingItemInfoSubTitle}>{user.username}</h3>
                </Link>
                <Button primary className={styles.followingItemBtn} onClick={handleClickFollowBtn}>
                    Follow
                </Button>
            </div>
        </div>
    );
}

FollowingItem.propTypes = {
    user: PropTypes.object.isRequired,
};

export default FollowingItem;
