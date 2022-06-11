import { useDispatch } from "react-redux";
import modalSlice from "~/redux/modalSlice";
import styles from "./CommentLogin.module.scss";

function CommentLogin() {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(modalSlice.actions.setModalLogin(true));
  }

  return (
    <div className={styles.commentLogin} onClick={handleLogin}>
        Đăng nhập để bình luận.
    </div>
  )
}

export default CommentLogin