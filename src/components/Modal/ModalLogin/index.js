import { useState } from "react";

import styles from './ModalLogin.module.scss';
import Modal from '~/components/Modal';
import Register from './Register';
import Login from './Login';

function ModalLogin() {
  const [isRegister, setIsRegister] = useState(false);

  const handleClickHeaderBtn = () => {
    setIsRegister(!isRegister);
  };
  return (
    <Modal>
      <div className={styles.modalInner}>
        <div className={styles.modalInnerHeader}>
          <h2>{isRegister ? "Đăng ký" : "Đăng nhập"}</h2>
          <button onClick={handleClickHeaderBtn}>
            {!isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </div>
        {isRegister ? <Register /> : <Login />}
      </div>
    </Modal>
  );
}

export default ModalLogin;
