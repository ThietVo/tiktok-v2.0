import { useSelector } from 'react-redux';

import { userLoginSelector } from '~/redux/selector';
import Discovery from './Discovery';
import FollowingAccounts from './FollowingAccounts';
import Footer from './Footer';
import Login from './Login';
import Navigation from './Navigation';
import styles from './Sidebar.module.scss';
import SuggestAccounts from './SuggestAccounts';

function Sidebar() {
    const { userLogged } = useSelector(userLoginSelector);
    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <Navigation />
                <Login />
                <SuggestAccounts />
                {userLogged.id && <FollowingAccounts />}
                <Discovery />
                <Footer />
            </div>
        </div>
    )
}

export default Sidebar;
