import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';
import styles from './AccountItem.module.scss';

function AccountItem({ data }) {
    
    return (
        <Link to={`/@${data.tiktokid}`} className={styles.wrapper}>
            <Avatar urlImg={data.avatar} avatarSmallPlus/>
            <div className={styles.info}>
                <div className="d-flex" >
                    <p className={styles.infoTiktokid}>{data.tiktokid}</p>
                    {data.verified && <FaCheckCircle className={clsx("checkIconSmall")} />}
                </div>
                <p className={styles.infoUsername}>{data.username}</p>
            </div>
        </Link>
     );
}

export default AccountItem;