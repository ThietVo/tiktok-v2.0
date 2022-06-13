import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { FaCheckCircle, FaChevronRight } from 'react-icons/fa';

import styles from './Search.module.scss';
import layoutSlice from '~/redux/layoutSlice';
import Avatar from '~/components/Avatar';
import { searchSeletor } from '~/redux/selectors';
import { Link } from 'react-router-dom';
import { calculateElapsedTime } from '~/assets/jsFunc';

function Search() {
    const dispatch = useDispatch();

    const { searchUserResult, searchVideoResult } = useSelector(searchSeletor);

    const videoRef = useRef();

    const [active, setActive] = useState({
        isTopTab: true,
        isUserTab: false,
        isVideoTab: false,
    });

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    const handleHoverVideo = () => {
        videoRef.current.play();
    };

    const handleUnHoverVideo = () => {
        videoRef.current.pause();
    };

    const handleClickTopTab = () => {
        setActive({
            isTopTab: true,
            isUserTab: false,
            isVideoTab: false,
        });
    };

    const handleClickUserTab = () => {
        setActive({
            isTopTab: false,
            isUserTab: true,
            isVideoTab: false,
        });
    };

    const handleClickVideoTab = () => {
        setActive({
            isTopTab: false,
            isUserTab: false,
            isVideoTab: true,
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.nav}>
                <div
                    className={clsx(styles.navItem, { [styles.navItemActive]: active.isTopTab })}
                    onClick={handleClickTopTab}
                >
                    Top
                </div>
                <div
                    className={clsx(styles.navItem, { [styles.navItemActive]: active.isUserTab })}
                    onClick={handleClickUserTab}
                >
                    Tài khoản
                </div>
                <div
                    className={clsx(styles.navItem, { [styles.navItemActive]: active.isVideoTab })}
                    onClick={handleClickVideoTab}
                >
                    Video
                </div>
            </div>

            {active.isTopTab && (
                <div className={styles.wrapperBody}>
                    <div className={styles.header}>
                        <p className={styles.headerTitle}>Tài khoản</p>
                        <div className={styles.headerSeeMore} onClick={handleClickUserTab}>
                            Xem thêm
                            <FaChevronRight  />
                        </div>
                    </div>
                    <div className={styles.content}>
                        {searchUserResult.length > 0 &&
                            searchUserResult.map(
                                (user, index) =>
                                    index < 3 && (
                                        <Link to={`/@${user.tiktokid}`} className={styles.userItem} key={index}>
                                            <Avatar urlImg={user.avatar} avatarLarge />
                                            <div className={styles.userInfo}>
                                                <div className={styles.userTitle}>
                                                    <p className={styles.userTiktokid}>{user.tiktokid}</p>
                                                    {user.verified && (
                                                        <FaCheckCircle className={clsx('checkIconSmall')} />
                                                    )}
                                                </div>
                                                <div className={styles.userSubTitle}>
                                                    <p className={styles.userUsername}>{user.username}</p>
                                                    <span>.</span>
                                                    <p className={styles.userFollower}>
                                                        <strong>{user.followers?.length || 0}</strong> Follower
                                                    </p>
                                                </div>
                                                <p className={styles.userDescription}>{user.description}</p>
                                            </div>
                                        </Link>
                                    ),
                            )}
                    </div>

                    <div className={styles.header}>Video</div>
                    <div className={styles.contentVideo}>
                        {searchVideoResult.length > 0 &&
                            searchVideoResult.map((video, index) => (
                                <div className={styles.videoItem} key={index}>
                                    <div
                                        className={styles.video}
                                        onMouseEnter={handleHoverVideo}
                                        onMouseLeave={handleUnHoverVideo}
                                    >
                                        <video ref={videoRef} key={video.url} loop muted playsInline>
                                            <source src={video.url} type="video/mp4" />
                                        </video>
                                        {/* <div className={styles.videoTime}>{`${new Date(video.createdAt).getDate()} - ${
                                            new Date(video.createdAt).getMonth() + 1
                                        }`}</div> */}
                                        <div className={styles.videoTime}>{calculateElapsedTime(video.createdAt)}</div>
                                    </div>
                                    <div className={styles.videoDescription}>{video.description}</div>
                                    <div className={styles.videoInfo}>
                                        <Avatar urlImg={video.user.avatar} avatarSmallS />
                                        <p className={styles.videoInfoTiktokid}>{video.user.tiktokid}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {active.isUserTab && (
                <div className={styles.wrapperBody}>
                    <div className={styles.header}>Tài khoản</div>
                    <div className={styles.content}>
                        {searchUserResult.length > 0 &&
                            searchUserResult.map((user, index) => (
                                <Link to={`/@${user.tiktokid}`} className={styles.userItem} key={index}>
                                    <Avatar urlImg={user.avatar} avatarLarge />
                                    <div className={styles.userInfo}>
                                        <div className={styles.userTitle}>
                                            <p className={styles.userTiktokid}>{user.tiktokid}</p>
                                            {user.verified && <FaCheckCircle className={clsx('checkIconSmall')} />}
                                        </div>
                                        <div className={styles.userSubTitle}>
                                            <p className={styles.userUsername}>{user.username}</p>
                                            <span>.</span>
                                            <p className={styles.userFollower}>
                                                <strong>{user.followers?.length || 0}</strong> Follower
                                            </p>
                                        </div>
                                        <p className={styles.userDescription}>{user.description}</p>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            )}

            {active.isVideoTab && (
                <div className={styles.wrapperBody}>
                    <div className={styles.header}>Video</div>
                    <div className={styles.contentVideo}>
                        {searchVideoResult.length > 0 &&
                            searchVideoResult.map((video, index) => (
                                <div className={styles.videoItem} key={index}>
                                    <div
                                        className={styles.video}
                                        onMouseEnter={handleHoverVideo}
                                        onMouseLeave={handleUnHoverVideo}
                                    >
                                        <video ref={videoRef} key={video.url} loop muted playsInline>
                                            <source src={video.url} type="video/mp4" />
                                        </video>
                                        <div className={styles.videoTime}>{calculateElapsedTime(video.createdAt)}</div>
                                    </div>
                                    <div className={styles.videoDescription}>{video.description}</div>
                                    <div className={styles.videoInfo}>
                                        <Avatar urlImg={video.user.avatar} avatarSmallS />
                                        <p className={styles.videoInfoTiktokid}>{video.user.tiktokid}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
