// import { useEffect, useState } from "react";
// import { BiLockAlt } from "react-icons/bi";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import { getVideoWithUserByVideoIdApi } from "~/callApi/videosApi";
// import { likedVideosSelector, usersSelector } from "~/redux/selectors";
// import videosSlice from "../../redux/videosSlice";
// import styles from "./UserDetailLikedVideos.module.scss";
// import UserDetailVideo from "./UserDetailVideo";

function UserDetailLikedVideos() {
  // const dispatch = useDispatch();
  // const { userId: userDetailId } = useParams();
  // const { userLogged } = useSelector(usersSelector);
  // const { likedVideos } = useSelector(likedVideosSelector);
  // const [videosWithUsers, setVideosWithUsers] = useState([]);

  // useEffect(() => {
  //   if (userDetailId === userLogged.id) {
  //     if (likedVideos.length > 0) {
  //       const sortVideosByCreatedAt = [...likedVideos].sort(
  //         //sort likedVideos by createdAt
  //         (a, b) =>
  //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //       );
  //       sortVideosByCreatedAt.forEach((element) => {
  //         getVideoWithUserByVideoIdApi(element.videoId).then((result) => {
  //           result[0].hasPublic &&
  //             setVideosWithUsers((prev) => [...prev, ...result]);
  //         });
  //       });        
  //     }
  //   }
  // }, [likedVideos]);

  // useEffect(() => {
  //   dispatch(videosSlice.actions.setVideosWithUsers(videosWithUsers));
  // }, [videosWithUsers])

  return (
    <>
      {/* {userDetailId !== userLogged.id ? (
        <div className={styles.alert}>
          <BiLockAlt className={styles.alertIcon} />
          <h2>Video đã thích của người dùng này ở trạng thái riêng tư</h2>
          <h4>Các video được thích bởi 'user.tiktokid' hiện đang ẩn</h4>
        </div>
      ) : (
        <div className={styles.likedVideos}>
          {videosWithUsers.length > 0 &&
            videosWithUsers.map((video, index) => (
              <UserDetailVideo user={userLogged} video={video} key={index} index={index}/>
            ))}
        </div>
      )} */}
    </>
  );
}

export default UserDetailLikedVideos;
