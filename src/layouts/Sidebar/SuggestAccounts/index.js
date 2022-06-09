import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

import SuggestAccountItem from './SuggestAccountItem';
import styles from './SuggestAccounts.module.scss';
import { getUsersApi } from '~/callApi/usersApi';
import { userLoginSelector } from '~/redux/selectors';

function SuggestAccounts() {
    const [userList, setUserList] = useState([]);
    const [lengthList, setlengthList] = useState(5);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        getUsersApi().then(res => setUserList(res));
    }, [dispatch]);

    const { userLogged } = useSelector(userLoginSelector);

    const handleAction = () => {
        if (show) {
            setlengthList(5);
            setShow(false);
        } else {
            setlengthList(30);
            setShow(true);
        }
    };

    const shuffleArr = useMemo(() => userList && [...userList].sort(() => Math.random() - 0.5), [userList]);

    let count = 0;
    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Tài khoản được đề xuất</p>

            {shuffleArr.map((user) => {
                count += 1;
                return (
                    count <= lengthList && user.id !== userLogged.id && <SuggestAccountItem key={user.id} user={user} />
                );
            })}

            <div className={styles.action}>
                <div className={styles.seeAll} onClick={handleAction}>
                    {!show ? 'Xem tất cả' : 'Ẩn bớt'}
                </div>
            </div>
            {/* show on table and mobile */}
            <div className={styles.tabletAction} onClick={handleAction}>
                {!show ? <BsChevronDown /> : <BsChevronUp />}
            </div>
        </div>
    );
}

export default SuggestAccounts;
