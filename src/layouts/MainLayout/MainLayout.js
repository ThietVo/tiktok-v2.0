import clsx from 'clsx';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { layoutSelector } from '~/redux/selectors';
import Header from '~/layouts/Header/Header';
import Sidebar from '~/layouts/Sidebar/Sidebar';
import Modal from '../Modal';
import styles from './MainLayout.module.scss';

function MainLayout({ children }) {
    const { hasClassContainer } = useSelector(layoutSelector);

    return (
        <div className={styles.wrapper}>
            <Modal />
            <Header />
            <div className={clsx(styles.container, {'container': hasClassContainer})}>
                <Sidebar />
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default MainLayout;