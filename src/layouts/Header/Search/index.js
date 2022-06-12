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


function Search() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
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
                setSearchResult(arr);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, [debounced]);

    const handleChange = (e) => {
        //ko cho nhap dau cach dau tien
        if(!e.target.value.startsWith(' ')){
            setSearchValue(e.target.value);
        }
    }

    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClickSearchBtn = () => {
        if(searchValue){
            navigate(`/search?q=${searchValue}`);
            setShowResult(false);
            dispatch(searchSlice.actions.setSearchValue(searchValue));
        }
    }

    return (
        <div className={styles.wrapper}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={styles.searchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={styles.searchTitle}>Tài khoản</h4>
                            {searchResult.length > 0 &&
                                searchResult.map((user) => <AccountItem key={user.id} data={user} />)}
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
