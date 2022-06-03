import clsx from "clsx";
import style from "./Avatar.module.scss";

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
          [style.avatarSmall]: avatarSmall,
          [style.avatarSmallPlus]: avatarSmallPlus,
          [style.avatarMedium]: avatarMedium,
          [style.avatarLarge]: avatarLarge,
          [style.avatarExtraLarge]: avatarExtraLarge
        })}
      />
    </>
  );
}

export default Avatar;
