import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Modal from '../Modal';
import styles from './HeaderOnlyLayout.module.scss';

function HeaderOnlyLayout({ children }) {
    return ( 
        <>
            <Modal />
            <Header />
            { children }
        </>
     );
}

HeaderOnlyLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default HeaderOnlyLayout;