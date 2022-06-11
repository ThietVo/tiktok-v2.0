import Sidebar from '~/layouts/Sidebar/Sidebar';
import HeaderNotContainer from '../HeaderNotContainer';
import Modal from '../Modal';
import styles from './LayoutNotContainer.module.scss';

function LayoutNotContainer({ children }) {
    return (
        <div className={styles.wrapper}>
            <Modal />
            <HeaderNotContainer />
            <div className={styles.container}>
                <Sidebar />
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    )
}

export default LayoutNotContainer;