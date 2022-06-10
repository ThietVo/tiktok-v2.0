import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

// import {
//   createLikedVideosApi,
//   deleteLikedVideoApi,
//   getLikesOfVideoApi,
// } from "~/callApi/likedVideosApi";
// import likedVideosSlice from "~/redux/likedVideosSlice";
// import modalSlice from "~/redux/modalSlice";
// import { likedVideosSelector, usersSelector } from "~/redux/selectors";
import styles from "./Heart.module.scss";

function Heart({ video, styleHeart }) {
  // const dispatch = useDispatch();
  // const { userLogged } = useSelector(usersSelector);

  // const { likedVideos } = useSelector(likedVideosSelector);
  const [numLikes, setNumLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [likedVideoId, setLikedVideoId] = useState();

  // useEffect(() => {
  //   if (likedVideos.length > 0) {
  //     const arr = likedVideos.map((element) => element.videoId);
  //     if (arr.includes(video.id)) {
  //       setIsLike(true);
  //       likedVideos.forEach((element) => {
  //         element.videoId === video.id && setLikedVideoId(element.id);
  //       });
  //     } else {
  //       setIsLike(false);
  //     }
  //   } else {
  //     setIsLike(false);
  //   }

  //   getLikesOfVideoApi(video.id).then((result) => {
  //     setNumLikes(result.length);
  //   });
  // }, [likedVideos, video]);

  const handleLikeVideo = () => {
    // if (!userLogged.id) {
    //   dispatch(modalSlice.actions.setModalLogin(true));
    // } else {
    //   if (!isLike) {
    //     const data = {
    //       id: uuidv4(),
    //       videoId: video.id,
    //       userId: userLogged.id,
    //       createdAt: new Date().toString(),
    //     };
    //     createLikedVideosApi(data);
    //     dispatch(likedVideosSlice.actions.setAddLikedVideo([data]));
    //   } else {
    //     deleteLikedVideoApi(likedVideoId);
    //     const data = likedVideos.filter(
    //       (element) => element.id !== likedVideoId
    //     );
    //     dispatch(likedVideosSlice.actions.setLikedVideos(data));
    //   }
    // }
  };
  return (
    <button
      className={styles.heart}
      style={
        styleHeart === "heartSmall"
          ? { flexDirection: "row" }
          : { flexDirection: "column" }
      }
    >
      <div className={clsx(styleHeart)} onClick={handleLikeVideo}>
        <FaHeart  className={clsx({'active': isLike})}/>
      </div>
      <span>{numLikes}</span>
    </button>
  );
}

export default Heart;
