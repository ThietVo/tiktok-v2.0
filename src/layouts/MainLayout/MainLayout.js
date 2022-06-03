import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
    return (
        <div>
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