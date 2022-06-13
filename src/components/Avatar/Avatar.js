import clsx from "clsx";
import styles from "./Avatar.module.scss";

function Avatar({
  urlImg,
  avatarSmallS,
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
          [styles.avatarSmallS]: avatarSmallS,
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
