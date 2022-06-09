import { useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./FollowingItem.module.scss";
import Avatar from "~/components/Avatar";
import Button from "~/components/Button";
import { useDispatch } from "react-redux";
import modalSlice from "~/redux/modalSlice";

function FollowingItem({ user }) {
  const dispatch = useDispatch();
  const videoRef = useRef();

  const handleHover = () => {
    user.videos.length > 0 && videoRef.current.play();
  };

  const handleUnHover = () => {
    user.videos.length > 0 && videoRef.current.pause();
  };

  const handleClickFollowBtn = () => {
    dispatch(modalSlice.actions.setModalLogin(true));
  }

  return (
    <Link
      to={`../${user.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.followingItem}
      onMouseEnter={handleHover}
      onMouseLeave={handleUnHover}
    >
      {user.videos.length > 0 && (
        <video ref={videoRef} muted loop className={styles.followingItemVideo}>
          <source src={user.videos[0].url} type="video/mp4" />
        </video>
      )}
      <div className={styles.followingItemInfo}>
        <Avatar urlImg={user.avatar} avatarMedium />
        <div className={styles.followingItemInfoDescription}>
          <h2 className={styles.followingItemInfoTitle}>{user.tiktokid}</h2>
          <h3 className={styles.followingItemInfoSubTitle}>{user.username}</h3>
        </div>
        <Button primary className={styles.followingItemBtn} onClick={handleClickFollowBtn}>Follow</Button>
      </div>
    </Link>
  );
}

export default FollowingItem;
