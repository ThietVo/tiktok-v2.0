import clsx from 'clsx';
import Search from './Search';
import styles from './Header.module.scss';
import Logo from './Logo';
import RightHeader from './RightHeader';


function Header() {
    return (
        <div className={styles.header}>
            <div className={clsx('container')}>
                <div className={styles.headerMain}>
                    <Logo />
                    <Search />
                    <RightHeader />
                </div>   
            </div>           
        </div>
    )
}

export default Header;