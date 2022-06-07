import Header from '~/layouts/Header/Header';
import Sidebar from '~/layouts/Sidebar/Sidebar';
import Modal from '../Modal';
import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Modal />
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