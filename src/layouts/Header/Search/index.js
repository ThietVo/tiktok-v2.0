import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { FaSistrix } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper/Wrapper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

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

    return (
        <div className={styles.wrapper}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={styles.searchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={styles.searchTitle}>Accounts</h4>
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

                    <button className={styles.searchBtn}>
                        <FaSistrix className={clsx(styles.searchBtnIcon)} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
