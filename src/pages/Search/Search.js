import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';

import styles from './Search.module.scss';
import layoutSlice from '~/redux/layoutSlice';
import Avatar from '~/components/Avatar';
import { searchSeletor } from '~/redux/selectors';

function Search() {
    const dispatch = useDispatch();
    const url = require('~/assets/images/logo.svg.png');

    const { searchValue } = useSelector(searchSeletor);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/users`)
            .then((res) => res.json())
            .then((res) => {
                const arr = res.filter(
                    (element) => element.tiktokid.includes(searchValue) || element.username.includes(searchValue),
                );
                setSearchResult(arr);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [searchValue]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Tài khoản</div>
            <div className={styles.content}>
                {searchValue.length > 0 &&
                    searchResult.map((element, index) => (
                        <div className={styles.item} key={index}>
                            <Avatar urlImg={url} avatarLarge />
                            <div className={styles.info}>
                                <div className={styles.title}>
                                    <p className={styles.tiktokid}>hoaa.hanassi</p>
                                    <FaCheckCircle className={clsx('checkIconSmall')} />
                                </div>
                                <div className={styles.subTitle}>
                                    <p className={styles.username}>Dao Le Phuong Hoa</p>
                                    <span>.</span>
                                    <p className={styles.follower}>
                                        <strong>3M</strong> Follower
                                    </p>
                                </div>
                                <p className={styles.description}>123</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Search;
