import clsx from 'clsx';
import Search from './Search';
import styles from './Header.module.scss';
import Logo from './Logo';
import RightHeader from './RightHeader';
import RightHeaderLogged from './RightHeaderLogged';
import { useSelector } from 'react-redux';
import { layoutSelector, usersSelector } from '~/redux/selectors';


function Header() {
    const { hasClassContainer } = useSelector(layoutSelector);
    const { userLogged } = useSelector(usersSelector);

    return (
        <div className={styles.header}>
            <div className={clsx({'container': hasClassContainer})}>
                <div className={styles.headerMain}>
                    <Logo />
                    <Search />
                    {userLogged.id ? <RightHeaderLogged /> : <RightHeader />}
                </div>   
            </div>           
        </div>
    )
}

export default Header;