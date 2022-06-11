import clsx from 'clsx';
import Search from './Search';
import styles from './Header.module.scss';
import Logo from './Logo';
import RightHeader from './RightHeader';
import { useSelector } from 'react-redux';
import { layoutSelector } from '~/redux/selectors';


function Header() {
    const { hasClassContainer } = useSelector(layoutSelector);

    return (
        <div className={styles.header}>
            <div className={clsx({'container': hasClassContainer})}>
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