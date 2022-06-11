import Search from '~/layouts/Header/Search';
import styles from './HeaderNotContainer.module.scss';
import Logo from '~/layouts/Header/Logo';
import RightHeader from '~/layouts/Header/RightHeader';

function HeaderNotContainer() {
    return (
        <div className={styles.header}>
            <div className={styles.headerMain}>
                <Logo />
                <Search />
                <RightHeader />
            </div>
        </div>
    );
}

export default HeaderNotContainer;
