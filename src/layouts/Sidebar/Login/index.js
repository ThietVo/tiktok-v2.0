import { useDispatch } from "react-redux";

import Button from "~/components/Button";
import styles from "./Login.module.scss";
import modalSlice from "~/redux/modalSlice";

function Login() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(modalSlice.actions.setModalLogin(true));
  };
  return (
    <div className={styles.sidebarLogin}>
      <p className={styles.sidebarLoginTip}>
        Đăng nhập để follow các tác giả, thích video và xem bình luận.
      </p>
      <Button
        outline
        large
        className={styles.sidebarLoginBtn}
        onClick={handleClick}
      >Đăng nhập</Button>
    </div>
  );
}

export default Login;
