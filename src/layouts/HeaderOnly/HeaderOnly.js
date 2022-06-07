import Header from '~/layouts/Header/Header';
import Modal from '../Modal';
import styles from './HeaderOnly.module.scss';

function HeaderOnly({ children }) {
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

export default HeaderOnly;