import { useEffect } from "react";
import { useDispatch } from "react-redux";
import modalSlice from "~/redux/modalSlice";
import styles from "./ToastMessage.module.scss";

function ToastMessage() {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(modalSlice.actions.setToastMessage(false));
        }, 1000)
    }, [])

  return (
    <div className={styles.toastMessage}>Đã xóa</div>
  )
}

export default ToastMessage;