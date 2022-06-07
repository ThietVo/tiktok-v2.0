import styles from "./Navigation.module.scss";
import { FaHome, FaUserFriends, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className={styles.nav}>
      <Link
        to="/"
        className={styles.navLink}
      >
        <FaHome className={styles.navLinkIcon} />
        <p>Dành cho bạn</p>
      </Link>
      <Link to="/following" className={styles.navLink}>
        <FaUserFriends className={styles.navLinkIcon} />
        <p>Đang Follow</p>
      </Link>
      <Link to="/live" className={styles.navLink}>
        <FaVideo className={styles.navLinkIcon} />
        <p>LIVE</p>
      </Link>
    </div>
  );
}

export default Navigation;
