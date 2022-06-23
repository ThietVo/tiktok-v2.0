import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

function Modal({ children }) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalOverlay}></div>

            <div className={styles.modalBody}>{children}</div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
