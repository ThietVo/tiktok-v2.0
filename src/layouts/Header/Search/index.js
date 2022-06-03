import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaSistrix } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import Tippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import PopperWrapper from '~/components/PopperWrapper';
import AccountItem from '~/components/AccountItem';

function Search() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setSearchResult([1, 2, 3]);
    }, []);

    return (
        <div className={styles.wrapper}>
            <Tippy
                interactive
                visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={styles.searchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={styles.searchTitle}>Accounts</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={styles.search}>
                    <input placeholder="Search accounts and videos" spellCheck={false} />
                    <button className={styles.searchClear}>
                        <GrClose />
                    </button>
                    <BiLoaderCircle className={styles.searchLoading} />

                    <button className={styles.searchBtn}>
                        <FaSistrix className={clsx(styles.searchBtnIcon)} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
