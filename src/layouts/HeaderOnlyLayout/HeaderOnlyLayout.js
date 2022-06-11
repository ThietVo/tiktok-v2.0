import Header from '../Header/Header';
import Modal from '../Modal';
import styles from './HeaderOnlyLayout.module.scss';

function HeaderOnlyLayout({ children }) {
    return ( 
        <div>
            <Modal />
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
     );
}

export default HeaderOnlyLayout;