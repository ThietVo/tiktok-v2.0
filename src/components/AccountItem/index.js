import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';

import Avatar from '../Avatar';
import styles from './AccountItem.module.scss';

function AccountItem({ data }) {
    
    return (
        <div className={styles.wrapper}>
            <Avatar urlImg={data.avatar} avatarSmallPlus/>
            <div className={styles.info}>
                <h4 className={styles.infoTiktokid}>
                    <span>{data.tiktokid}</span>
                    <FaCheckCircle className={clsx("checkIconSmall")} />
                </h4>
                <p className={styles.infoUsername}>{data.username}</p>
            </div>
        </div>
     );
}

export default AccountItem;