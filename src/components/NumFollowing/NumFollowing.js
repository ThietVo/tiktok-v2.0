import styles from "./NumFollowing.module.scss";

function NumFollowing({ num }) {
  return (
    <div className={styles.numFollowing}>
        <strong className={styles.numFollowingText}>{num}</strong> Follower
    </div>
  )
}

export default NumFollowing