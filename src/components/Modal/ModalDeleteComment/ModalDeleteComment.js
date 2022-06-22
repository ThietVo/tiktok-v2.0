import { useDispatch, useSelector } from 'react-redux';

import { deleteCommentApi } from '~/callApi/commentsApi';
import modalSlice from '~/redux/modalSlice';
import { commentSelector, videosSelector } from '~/redux/selectors';
import videosSlice from '~/redux/videosSlice';
import Modal from '../Modal';
import styles from './ModalDeleteComment.module.scss';

function ModalDeleteComment() {
    const dispatch = useDispatch();
    const { commentsOfCurrentVideo } = useSelector(videosSelector);
    const { commentIdToDel } = useSelector(commentSelector);

    const handleDelete = () => {
        if (commentIdToDel) {
            deleteCommentApi(commentIdToDel);

            dispatch(modalSlice.actions.setModalDeleteComment(false));
            dispatch(modalSlice.actions.setToastMessage(true));

            dispatch(
                videosSlice.actions.setCommentsOfCurrentVideo(
                    commentsOfCurrentVideo.filter((element) => element.id !== commentIdToDel),
                ),
            );
        }
    };

    const handleCancel = () => {
        dispatch(modalSlice.actions.setModalDeleteComment(false));
    };
    return (
        <Modal>
            <div className={styles.deleteComment}>
                <p className={styles.deleteCommentText}>Bạn có chắc chắn muốn xóa bình luận này?</p>
                <button className={styles.deleteCommentDel} onClick={handleDelete}>
                    Xóa
                </button>
                <button className={styles.deleteCommentCancel} onClick={handleCancel}>
                    Hủy
                </button>
            </div>
        </Modal>
    );
}

export default ModalDeleteComment;
