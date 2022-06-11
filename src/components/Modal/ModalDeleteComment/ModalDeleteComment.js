import { useDispatch, useSelector } from "react-redux";

import { deleteCommentApi } from "~/callApi/commentsApi";
import commentSlice from "~/redux/commentSlice";
import modalSlice from "~/redux/modalSlice";
import { commentSelector } from "~/redux/selectors";
import Modal from "../Modal";
import styles from "./ModalDeleteComment.module.scss";

function ModalDeleteComment() {
  const dispatch = useDispatch();
  const { commentIdToDel } = useSelector(commentSelector);
  const { reload } = useSelector(commentSelector);

  const handleDelete = () => {
    if (commentIdToDel) {
      deleteCommentApi(commentIdToDel);

      dispatch(modalSlice.actions.setModalDeleteComment(false));
      setTimeout(() => {
        dispatch(modalSlice.actions.setToastMessage(true));
      }, 500)
      dispatch(commentSlice.actions.setReload(!reload));
    }
  };

  const handleCancel = () => {
    dispatch(modalSlice.actions.setModalDeleteComment(false));
  };
  return (
    <Modal>
      <div className={styles.deleteComment}>
        <p className={styles.deleteCommentText}>
          Bạn có chắc chắn muốn xóa bình luận này?
        </p>
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
