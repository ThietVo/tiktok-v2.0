import HashTag from './HashTag';
import styles from "./Discovery.module.scss";

function Discovery() {
  return (
    <div className={styles.discovery}>
      <p className={styles.discoveryHeader}>Khám phá</p>
      <HashTag text={"outfitgucnga"} />
      <HashTag text={"Anh Yêu Vội Thế (Mee Remix) - LaLa Trần, Mee Media"} />
    </div>
  );
}

export default Discovery;