import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import modalSlice from "~/redux/modalSlice";
// import sidebarSlice from "~/redux/sidebarSlice";
import uploadSlice from "~/redux/uploadSlice";
import { userLoginSelector, uploadSelector } from "~/redux/selectors";
import styles from "./ModalUpload.module.scss";
import Modal from '~/components/Modal';

function ModalUpload() {
  const dispatch = useDispatch();
  const { userLogged } = useSelector(userLoginSelector);
  const { progess } = useSelector(uploadSelector);

  const handleUploadAnotherVideo = () => {
    dispatch(uploadSlice.actions.setUploaded(true));
    dispatch(modalSlice.actions.setModalUpload(false));
  };

  const handleViewProfile = () => {
    // dispatch(sidebarSlice.actions.setShowSidebar(true));
    dispatch(modalSlice.actions.setModalUpload(false));
  };
  return (
    <Modal>
      <div className={styles.modalUpload}>
        {progess !== 100 ? (
          <div className={styles.modalUploading}>Đang upload...{progess}%</div>
        ) : (
          <div className={styles.modalUploaded}>
            <p className={styles.modalUploadedInfo}>
              Video của bạn đang được tải lên TikTok!
            </p>
            <button
              className={styles.modalUploadedBtn}
              onClick={handleUploadAnotherVideo}
            >
              Tải video khác lên
            </button>
  
            <Link
              to={userLogged.id}
              className={styles.modalUploadedLink}
              onClick={handleViewProfile}
            >
              Xem hồ sơ
            </Link>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ModalUpload;
