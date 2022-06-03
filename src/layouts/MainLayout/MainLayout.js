import Header from '~/layouts/Header/Header';
import Sidebar from '~/layouts/Sidebar/Sidebar';
import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default MainLayout;