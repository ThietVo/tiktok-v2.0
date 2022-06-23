import { FaMusic, FaCheckCircle } from 'react-icons/fa';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Avatar from '~/components/Avatar';
import styles from './HomeItem.module.scss';
import HomeItemVideo from './HomeItemVideo';
import HomeItemVideoAction from './HomeItemVideoAction';
import UserCard from '../UserCard';
import FollowButton from '~/components/Button/FollowButton';
import { calculateElapsedTime } from '~/assets/jsFunc';
import {
    useDispatch,
    // useSelector
} from 'react-redux';
// import { videosSelector } from '~/redux/selectors';
// import videosSlice from '~/redux/videosSlice';

function HomeItem({ index, user, video, FollowBtn }) {
    const dispatch = useDispatch();
    // const { volumeVideo } = useSelector(videosSelector);
    const [style, setStyle] = useState({
        display: 'none',
        top: 20,
        left: -68,
    });

    let timerId = useRef();

    const handleMouseEnter = () => {
        timerId.current = setTimeout(() => {
            setStyle({ ...style, display: 'block' });
        }, 1000);
    };
    const handleMouseLeave = () => {
        clearTimeout(timerId.current);

        setStyle({ ...style, display: 'none' });
    };

    // const handleKeyDown = (e) => {
    //     console.log(e.key);
    //     if (e.key === 'm' || e.key === 'M') {
    //         if (volumeVideo === 0) {
    //             dispatch(videosSlice.actions.setVolumnVideo(0.5));
    //         } else {
    //             dispatch(videosSlice.actions.setVolumnVideo(0));
    //         }
    //     }
    // };

    return (
            <div
                className={styles.homeMainItem}
                // onKeyDown={handleKeyDown}
                // tabIndex="-1"
            >
                <div className={styles.avatar}><Avatar urlImg={user.avatar} avatarLarge /></div>

                <div className={styles.homeMainItemContent}>
                    <div className={styles.homeMainItemContentHeader}>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <Link
                                to={FollowBtn ? `@${user.tiktokid}` : `../@${user.tiktokid}`} //FollowBtn = true -> Homepage, =false -> followingpage
                                className={styles.homeMainItemContentAuthor}
                            >
                                <h3 className={styles.homeMainItemContentAuthorTitle}>{user.tiktokid}</h3>
                                {user.verified ? <FaCheckCircle className={clsx('checkIconSmall')} /> : ''}
                                <h4 className={styles.homeMainItemContentAuthorName}>{user.username}</h4>
                                {!FollowBtn && (
                                    <p className={styles.homeMainItemContentAuthorName}>
                                        {' '}
                                        . {calculateElapsedTime(video.createdAt)}
                                    </p>
                                )}
                            </Link>
                            <UserCard style={style} user={user} />
                        </div>

                        <div className={styles.homeMainItemContentDescription}>
                            <span>{video.description}</span>
                        </div>
                        <Link to="#" className={styles.homeMainItemContentMusic}>
                            <FaMusic className={styles.homeMainItemContentMusicIcon} />
                            Nhạc nền - {user.username}
                        </Link>
                    </div>

                    <div className={styles.homeMainItemContentVideoWrapper}>
                        <HomeItemVideo index={index} video={video} />
                        <HomeItemVideoAction index={index} video={video} />
                    </div>
                </div>

                {FollowBtn && <FollowButton user={user} />}
            </div>
    );
}

HomeItem.propTypes = {
    index: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired,
    FollowBtn: PropTypes.bool.isRequired,
};

export default HomeItem;
