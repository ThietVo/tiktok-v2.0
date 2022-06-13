import styles from './Navigation.module.scss';
import { FaHome, FaUserFriends, FaVideo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';

function Navigation() {
    const [active, setActive] = useState({
        isHome: true,
        isFollowing: false,
        isLive: false,
    });
    const handleClickHome = () => {
        setActive({
            isHome: true,
            isFollowing: false,
            isLive: false,
        });
    };

    const handleClickFollowing = () => {
        setActive({
            isHome: false,
            isFollowing: true,
            isLive: false,
        });
    };

    const handleClickLive = () => {
        setActive({
            isHome: false,
            isFollowing: false,
            isLive: true,
        });
    };
    return (
        <div className={styles.nav}>
            <Link
                to="/"
                className={clsx(styles.navLink, { [styles.navLinkActive]: active.isHome })}
                onClick={handleClickHome}
            >
                <FaHome className={styles.navLinkIcon} />
                <p>Dành cho bạn</p>
            </Link>
            <Link
                to="/following"
                className={clsx(styles.navLink, { [styles.navLinkActive]: active.isFollowing })}
                onClick={handleClickFollowing}
            >
                <FaUserFriends className={styles.navLinkIcon} />
                <p>Đang Follow</p>
            </Link>
            <Link
                to="/live"
                className={clsx(styles.navLink, { [styles.navLinkActive]: active.isLive })}
                onClick={handleClickLive}
            >
                <FaVideo className={styles.navLinkIcon} />
                <p>LIVE</p>
            </Link>
        </div>
    );
}

export default Navigation;
