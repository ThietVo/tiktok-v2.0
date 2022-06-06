import clsx from "clsx";
import styles from "./Avatar.module.scss";

function Avatar({
  urlImg,
  avatarSmall,
  avatarSmallPlus,
  avatarMedium,
  avatarLarge,
  avatarExtraLarge,
}) {
  return (
    <>
      <img
        src={urlImg}
        alt=""
        className={clsx({
          [styles.avatarSmall]: avatarSmall,
          [styles.avatarSmallPlus]: avatarSmallPlus,
          [styles.avatarMedium]: avatarMedium,
          [styles.avatarLarge]: avatarLarge,
          [styles.avatarExtraLarge]: avatarExtraLarge
        })}
      />
    </>
  );
}

export default Avatar;
