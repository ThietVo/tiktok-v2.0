import styles from "./NumFollowers.module.scss";

function NumFollowers({ num }) {
  return (
    <div className={styles.numFollowers}>
        <strong className={styles.numFollowersText}>{num}</strong> Follower
    </div>
  )
}

export default NumFollowers;