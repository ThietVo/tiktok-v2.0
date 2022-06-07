import clsx from "clsx";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import Avatar from "~/components/Avatar";
import styles from "./UserCard.module.scss";
import NumFollowers from "../NumFollowers/NumFollowers";
import FollowButton from "../Button/FollowButton";
import NumLikes from "../NumLikes/NumLikes";

function UserCard({ style, user }) {

  return (
    <>
      <div className={styles.userCard} style={style}>
        <div className={styles.userCardContent}>
          <Link to={`${user.id}`} className={styles.userCardLink}>
            <Avatar avatarMedium urlImg={user.avatar} />
            <div className={styles.userCardTitle}>
              {user.tiktokid}
              <FaCheckCircle className={clsx("checkIconSmall")} />
            </div>
            <div className={styles.userCardDescription}>{user.username}</div>
          </Link>
          <div className={styles.userCardFollowBtn}>
            <FollowButton user={user}/>
          </div>
        </div>
        <div className={styles.userCardCountInfos}>
          <NumFollowers num={user.followers.length ? user.followers.length : 0} />
          <NumLikes userId={user.id}/>
        </div>
      </div>
    </>
  );
}

export default UserCard;
