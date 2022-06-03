import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';

import Avatar from '../Avatar';
import styles from './AccountItem.module.scss';

function AccountItem() {
    const url = require('~/assets/images/logo.svg.png');
    return (
        <div className={styles.wrapper}>
            <Avatar urlImg={url} avatarSmallPlus/>
            <div className={styles.info}>
                <h4 className={styles.infoTiktokid}>
                    <span>hoaa.hanassi</span>
                    <FaCheckCircle className={clsx("checkIconSmall")} />
                </h4>
                <p className={styles.infoUsername}>Dao Le Phuong Hoa</p>
            </div>
        </div>
     );
}

export default AccountItem;