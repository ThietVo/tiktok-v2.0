import { useDispatch, useSelector } from "react-redux";

import styles from "./ModalSetPrivacy.module.scss";
import Privacy from "~/components/Privacy";
import Modal from "../Modal";
import { uploadSelector, videosSelector } from "~/redux/selectors";
import modalSlice from "~/redux/modalSlice";
import uploadSlice from "~/redux/uploadSlice";
import { updateVideoApi } from "~/callApi/videosApi";
import videosSlice from "~/redux/videosSlice";

function ModalSetPrivacy() {
  const dispatch = useDispatch();
  const { hasPublic, hasComment } = useSelector(uploadSelector);
  const { videosWithUsers, indexCurrentVideo } = useSelector(videosSelector);

  const video = videosWithUsers[indexCurrentVideo];
  const videosWithUsersUpdated = [...videosWithUsers];

  const handleSetPrivacy = () => {
    updateVideoApi(video.id, { hasPublic, hasComment });

    setTimeout(() => {
      let data = {
        ...video,
        hasPublic: hasPublic,
        hasComment: hasComment,
      };
      videosWithUsersUpdated.splice(indexCurrentVideo, 1, data);

      dispatch(videosSlice.actions.setVideosWithUsers(videosWithUsersUpdated));

      dispatch(modalSlice.actions.setModalSetPrivacy(false));
      dispatch(uploadSlice.actions.setPublicVideo(true));
      dispatch(uploadSlice.actions.setHasCommentVideo(true));
    }, 500);
  };
  const handleCancel = () => {
    dispatch(modalSlice.actions.setModalSetPrivacy(false));
    dispatch(uploadSlice.actions.setPublicVideo(true));
    dispatch(uploadSlice.actions.setHasCommentVideo(true));
  };
  return (
    <Modal>
      <div className={styles.modalSetPrivacy}>
        <div className={styles.modalSetPrivacyHeader}>
          Cài đặt quyền riêng tư
        </div>
        <Privacy />
        <div className={styles.modalSetPrivacyFooter}>
          <div
            className={styles.modalSetPrivacyFooterCancel}
            onClick={handleCancel}
          >
            Hủy
          </div>
          <div
            className={styles.modalSetPrivacyFooterUpdate}
            onClick={handleSetPrivacy}
          >
            Cập nhật
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalSetPrivacy;
