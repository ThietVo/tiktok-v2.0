import { useEffect, useState } from "react";
import clsx from "clsx";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { usersSelector } from "~/redux/selectors";
import modalSlice from "~/redux/modalSlice";
import styles from "./HomeItemVideoAction.module.scss";
import Heart from '~/components/Heart';
import { getCommentOfVideoApi } from "~/callApi/commentsApi";
import videosSlice from "~/redux/videosSlice";

function HomeItemVideoAction({ index, user, video }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLogged } = useSelector(usersSelector);
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    setTimeout(() => {
      getCommentOfVideoApi(video.id).then((data) => setComments(data));
    }, 500);
  }, []);

  const handleCommentVideo = () => {
    if (!userLogged.id) {
      dispatch(modalSlice.actions.setModalLogin(true));
    } else {
      // navigate(`@${user.tiktokid}/video/${video.id}`);
      
      dispatch(modalSlice.actions.setModalVideoDetail(true));
      dispatch(videosSlice.actions.setIndexCurrentVideo(index));
    }
  };

  return (
    <div className={styles.videoAction}>
      <div>
        <Heart video={video} styleHeart={"heartMedium"}/>
      </div>
      <button
        type="button"
        className={clsx(styles.videoActionBtn, styles.videoActionBtnComment)}
      >
        <div
          // to={`/${user.id}/video/${video.id}`}
          className={styles.videoActionIcon}
          onClick={handleCommentVideo}
        >
          <FaCommentDots />
        </div>
        <strong>{comments ? comments.length : 0}</strong>
      </button>
      <button
        type="button"
        className={clsx(styles.videoActionBtn, styles.videoActionBtnShare)}
      >
        <div className={styles.videoActionIcon}>
          <FaShare />
        </div>
        <strong>{video.shares}</strong>
      </button>
    </div>
  );
}
export default HomeItemVideoAction;
