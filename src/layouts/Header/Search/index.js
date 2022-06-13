import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { FaSistrix } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper/Wrapper';
import AccountItem from '~/components/AccountItem';
import { useDispatch } from 'react-redux';
import searchSlice from '~/redux/searchSlice';
import { getVideosWithUsersApi } from '~/callApi/videosApi';

function Search() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [searchVideoResult, setSearchVideoResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchUserResult([]);
            return;
        }

        setLoading(true);

        fetch(`http://localhost:4000/users`)
            .then((res) => res.json())
            .then((res) => {
                const arr = res.filter(
                    (element) =>
                        debounced !== '' &&
                        (element.tiktokid.includes(debounced) || element.username.includes(debounced)),
                );
                setSearchUserResult(arr);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
        //
        getVideosWithUsersApi().then((res) => {
            const arr1 = res.filter((element) => debounced !== '' && element.description.includes(debounced));
            setSearchVideoResult(arr1);
        });
    }, [debounced]);

    const handleChange = (e) => {
        //ko cho nhap dau cach dau tien
        if (!e.target.value.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleClearSearch = () => {
        setSearchValue('');
        setSearchUserResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClickSearchBtn = () => {
        if (searchValue) {
            navigate(`/search?q=${debounced}`);
            setShowResult(false);
            dispatch(searchSlice.actions.setSearchUserResult(searchUserResult));
            dispatch(searchSlice.actions.setSearchVideoResult(searchVideoResult));
        }
    };

    return (
        <div className={styles.wrapper}>
            <HeadlessTippy
                interactive
                visible={showResult && searchUserResult.length > 0}
                render={(attrs) => (
                    <div className={styles.searchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={styles.searchTitle}>Tài khoản</h4>
                            {searchUserResult.length > 0 &&
                                searchUserResult.map((user, index) => {
                                    return index < 5 && <AccountItem key={user.id} data={user} />;
                                })}
                            <div className={styles.viewMore} onClick={handleClickSearchBtn}>
                                Xem tất cả kết quả dành cho `"{debounced}"`
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={styles.search}>
                    <input
                        ref={inputRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={styles.searchClear} onClick={handleClearSearch}>
                            <GrClose />
                        </button>
                    )}

                    {loading && <BiLoaderCircle className={styles.searchLoading} />}

                    <button className={styles.searchBtn} onClick={handleClickSearchBtn}>
                        <FaSistrix className={clsx(styles.searchBtnIcon)} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
