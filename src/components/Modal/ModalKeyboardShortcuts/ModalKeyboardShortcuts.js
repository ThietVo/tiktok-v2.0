import { useDispatch } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import { BsCaretDownSquare, BsCaretUpSquare } from 'react-icons/bs';
import { TbLetterL, TbLetterM } from 'react-icons/tb';

import styles from './ModalKeyboardShortcuts.module.scss';
import Modal from '~/components/Modal';
import modalSlice from '~/redux/modalSlice';

function ModalKeyboardShortcuts() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(modalSlice.actions.setModalKeyboardShortcuts(false));
    };

    return (
        <Modal>
            <div className={styles.wrapper}>
                <div className={styles.close} onClick={handleClose}>
                    <GrClose className={styles.closeIcon} />
                </div>
                <div className={styles.header}>Phím tắt trên bàn phím</div>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <p className={styles.itemText}>Quay về video trước</p>
                        <BsCaretUpSquare className={styles.itemIcon} />
                    </div>
                    <div className={styles.item}>
                        <p className={styles.itemText}>Đi đến video tiếp theo</p>
                        <BsCaretDownSquare className={styles.itemIcon} />
                    </div>
                    <div className={styles.item}>
                        <p className={styles.itemText}>Thích video</p>
                        <TbLetterL className={styles.itemIcon} />
                    </div>
                    <div className={styles.item}>
                        <p className={styles.itemText}>Tắt tiếng / bật tiếng video</p>
                        <TbLetterM className={styles.itemIcon} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalKeyboardShortcuts;
