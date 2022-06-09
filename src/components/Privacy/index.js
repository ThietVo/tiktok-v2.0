import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSelector } from "~/redux/selectors";
import uploadSlice from "~/redux/uploadSlice";
import styles from "./Privacy.module.scss";

function Privacy() {
  const dispatch = useDispatch();
  const checkboxRef = useRef();
  const { hasPublic, hasComment } = useSelector(uploadSelector);
  const handleSelectPublic = (e) => {
      dispatch(uploadSlice.actions.setPublicVideo(e.target.value === 'true' ? true : false));
  };

  const handleCheckbox = () => {
        dispatch(uploadSlice.actions.setHasCommentVideo(checkboxRef.current.checked));
  };
  return (
    <div className={styles.privacy}>
      <div className={styles.privacySelection}>
        <p className={styles.privacySelectionDesc}>Ai có thể xem video này</p>
        <select onChange={handleSelectPublic} value={hasPublic}>
          <option value={true}>Công khai</option>
          <option value={false}>Riêng tư</option>
        </select>
      </div>
      <div className={styles.privacySwitch}>
        <span className={styles.privacySwitchDesc}>Cho phép bình luận</span>
        <label className={styles.privacySwitchBtn}>
          <input
            ref={checkboxRef}
            type="checkbox"
            checked ={hasComment}
            className={styles.privacySwitchBtnInput}
            onChange={handleCheckbox}
          />
          <span className={styles.privacySwitchBtnSlider}></span>
        </label>
      </div>
    </div>
  );
}

export default Privacy;
