import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import styles from "./FollowingAccounts.module.scss";
import FollowingAccountItem from "./FollowingAccountItem";
import { getUserApi } from "~/callApi/usersApi";
import { usersSelector } from "~/redux/selectors";

function FollowingAccounts() {
  const { userLogged } = useSelector(usersSelector);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [lengthList, setlengthList] = useState(5);

  useEffect(() => {
    if (userLogged.following.length > 0) {
      userLogged.following.map((id) => {
        return getUserApi(id).then((result) =>
          setFollowingUsers((prev) => [...prev, result])
        );
      });
    }
  }, [userLogged.id]);

  const handleAction = () => {
    if (show) {
      setlengthList(5);
      setShow(false);
    } else {
      setlengthList(30);
      setShow(true);
    }
  };

  let count = 0;
  
  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>Tài khoản đang theo dõi</p>
      {followingUsers.length > 0 &&
        followingUsers.map((user, index) => {
          count += 1;
          return (
            count <= lengthList && (
              <FollowingAccountItem key={index} user={user} />
            )
          );
        })}
      <div className={styles.action}>
        <div
          className={styles.seeAll}
          onClick={handleAction}
        >
          {!show ? "Xem tất cả" : "Ẩn bớt"}
        </div>
      </div>
      
      {/* show on table and mobile */}
      <div className={styles.tabletAction} onClick={handleAction}>
        {!show ? <BsChevronDown /> : <BsChevronUp />}
      </div>
    </div>
  );
}

export default FollowingAccounts;
