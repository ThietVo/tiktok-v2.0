import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';

import styles from './Search.module.scss';
import layoutSlice from '~/redux/layoutSlice';
import Avatar from '~/components/Avatar';
import { searchSeletor } from '~/redux/selectors';
import { Link } from 'react-router-dom';

function Search() {
    const dispatch = useDispatch();

    const { searchResult } = useSelector(searchSeletor);

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Tài khoản</div>
            <div className={styles.content}>
                {searchResult.length > 0 &&
                    searchResult.map((user, index) => (
                        <Link to={`/@${user.tiktokid}`} className={styles.item} key={index}>
                            <Avatar urlImg={user.avatar} avatarLarge />
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    <p className={styles.tiktokid}>{user.tiktokid}</p>
                                    {user.verified && <FaCheckCircle className={clsx('checkIconSmall')} />}
                                </div>
                                <div className={styles.subTitle}>
                                    <p className={styles.username}>{user.username}</p>
                                    <span>.</span>
                                    <p className={styles.follower}>
                                        <strong>{user.followers?.length || 0}</strong> Follower
                                    </p>
                                </div>
                                <p className={styles.description}>{user.description}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default Search;
