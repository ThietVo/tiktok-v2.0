import PropTypes from 'prop-types';
import { BsChevronLeft } from 'react-icons/bs';

import styles from './Menu.module.scss';

function MenuHeader({ title, onBack }) {
    return (
        <header className={styles.menuHeader}>
            <button className={styles.backBtn} onClick={onBack}>
                <BsChevronLeft />
            </button>
            <h4 className={styles.menuHeaderTitle}>{title}</h4>
        </header>
    );
}

MenuHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
}

export default MenuHeader;