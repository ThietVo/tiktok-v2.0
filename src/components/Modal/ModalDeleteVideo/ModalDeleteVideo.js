import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";

import { deleteVideoApi } from "~/callApi/videosApi";
import modalSlice from "~/redux/modalSlice";
import { videosSelector } from "~/redux/selectors";
import Modal from "../Modal";
import styles from "./ModalDeleteVideo.module.scss";
import { deleteCommentByVideoIdApi } from "~/callApi/commentsApi";
import { useNavigate } from "react-router-dom";

function ModalDeleteVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videosWithUsers, indexCurrentVideo } = useSelector(videosSelector);

  const video = videosWithUsers[indexCurrentVideo];

  const handleDelete = () => {
    //Delete video from firebase storage
    const storage = getStorage();
    const videoRef = ref(storage, video.url);
    deleteObject(videoRef).then(() => {
      dispatch(modalSlice.actions.setToastMessage(true));
    }).catch(err => {
      console.log(err);
    })
    //delete video from database
    deleteVideoApi(video.id);
    
    //delete comments of video deleted
    deleteCommentByVideoIdApi(video.id);
    //navigate
    setTimeout(()=>{
      dispatch(modalSlice.actions.setModalVideoDetail(false));
      navigate(-1);
    }, 1500)

    dispatch(modalSlice.actions.setModalDeleteVideo(false));
  };

  const handleCancel = () => {
      dispatch(modalSlice.actions.setModalDeleteVideo(false));
  };
  return (
    <Modal>
      <div className={styles.deleteVideo}>
        <p className={styles.deleteVideoText}>
          Bạn có chắc chắn muốn xóa video này?
        </p>
        <button className={styles.deleteVideoDel} onClick={handleDelete}>
          Xóa
        </button>
        <button className={styles.deleteVideoCancel} onClick={handleCancel}>
          Hủy
        </button>
      </div>
    </Modal>
  );
}

export default ModalDeleteVideo;
