import { FaMusic, FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import Avatar from "~/components/Avatar";
import styles from "./HomeItem.module.scss";
import HomeItemVideo from "./HomeItemVideo";
import HomeItemVideoAction from "./HomeItemVideoAction";
import UserCard from "../UserCard";
import FollowButton from "~/components/Button/FollowButton";
import { useDispatch } from "react-redux";
import usersSlice from "~/redux/usersSlice";

function HomeItem({ index, user, video, FollowBtn }) {
  const dispatch = useDispatch();
  const [style, setStyle] = useState({
    display: "none",
    top: 20,
    left: -68,
  });

  let timerId = useRef();

  const handleMouseEnter = () => {
    timerId.current = setTimeout(() => {
      setStyle({ ...style, display: "block" });
    }, 1000);
  };
  const handleMouseLeave = () => {
    clearTimeout(timerId.current);

    setStyle({ ...style, display: "none" });
  };

  return (
    <>
      <div className={styles.homeMainItem}>
        <Avatar urlImg={user.avatar} avatarLarge />

        <div className={styles.homeMainItemContent}>
          <div className={styles.homeMainItemContentHeader}>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={FollowBtn ? `@${user.tiktokid}` : `../@${user.tiktokid}`} //FollowBtn = true -> Homepage, =false -> followingpage
                className={styles.homeMainItemContentAuthor}
              >
                <h3 className={styles.homeMainItemContentAuthorTitle}>
                  {user.tiktokid}
                </h3>
                {user.verified ? (
                  <FaCheckCircle className={clsx("checkIconSmall")} />
                ) : (
                  ""
                )}
                <h4 className={styles.homeMainItemContentAuthorName}>
                  {user.username}
                </h4>
              </Link>
              <UserCard style={style} user={user} />
            </div>

            <div className={styles.homeMainItemContentDescription}>
              <span>{video.description}</span>
            </div>
            <Link to="#" className={styles.homeMainItemContentMusic}>
              <FaMusic className={styles.homeMainItemContentMusicIcon} />
              Nhạc nền - {user.username}
            </Link>
          </div>

          <div className={styles.homeMainItemContentVideoWrapper}>
            <HomeItemVideo index={index} video={video} user={user} />
            <HomeItemVideoAction index={index} video={video} user={user} />
          </div>
        </div>

        {FollowBtn && <FollowButton user={user} />}
      </div>

      {/* mobileResponsive */}
      {/* <div className={styles.mobileItem}>
        <div className={styles.mobileItemVideo}>
          <video key={video.url} loop muted playsInline controls>
            <source src={video.url} />
          </video>
        </div>
        <div className={styles.mobileItemInfo}>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link
              to={FollowBtn ? `${user.id}` : `../${user.id}`}
              className={styles.mobileItemInfoAuthor}
            >
              <h4 className={styles.mobileItemInfoAuthorName}>
                @{user.username}
              </h4>

              {user.verified ? (
                <FaCheckCircle className={clsx("checkIconSmall")} />
              ) : (
                ""
              )}
            </Link>
          </div>

          <div className={styles.mobileItemInfoDescription}>
            <span>{video.description}</span>
          </div>
          <Link to="#" className={styles.mobileItemInfoMusic}>
            <FaMusic className={styles.mobileItemInfoMusicIcon} />
            Nhạc nền - {user.username}
          </Link>
        </div>
        <div className={styles.mobileItemAction}>
          <Link to="#" className={styles.mobileItemActionAvatar}>
            <Avatar urlImg={user.avatar} avatarMedium />
          </Link>
          <div className={styles.mobileItemActionAction}>
            <VideoAction index={index} video={video} user={user} />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default HomeItem;
