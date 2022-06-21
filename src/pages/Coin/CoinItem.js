import clsx from 'clsx';
import { BsCoin } from 'react-icons/bs';
import styles from './Coin.module.scss';
import { convertNumToThreeDigits } from '~/assets/jsFunc';

function CoinItem({ item, onClick, isActive }) {

    return (
        <div className={clsx(styles.coinItem, { [styles.coinItemActive]: isActive })} onClick={onClick}>
            <div className={styles.coinItemNum}>
                <BsCoin className={styles.coinIconLager} />
                <span className={styles.coinItemNumDisplay}>{convertNumToThreeDigits(item.numCoin)}</span>
                {/* <input type="number" pattern="[0-9]*" className={styles.coinItemNumInput}/> */}
            </div>
            <div className={styles.coinItemText}>đ {convertNumToThreeDigits(item.price)}</div>
        </div>
    );
}

export default CoinItem;
