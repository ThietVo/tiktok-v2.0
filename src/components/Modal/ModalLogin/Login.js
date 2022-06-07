import { useState } from 'react';
import { GoAlert } from 'react-icons/go';
import { useDispatch } from 'react-redux';

import { auth } from '~/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import modalSlice from '~/redux/modalSlice';
import Button from '~/components/Button';
import styles from './ModalLogin.module.scss';

function Login() {
    const dispatch = useDispatch();
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [errLogin, setErrLogin] = useState();

    const handleCloseModal = () => {
        dispatch(modalSlice.actions.setModalLogin(false));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
            .then(() => {
                dispatch(modalSlice.actions.setModalLogin(false));
            })
            .catch((err) => {
                setErrLogin(true);
            });
    };
    return (
        <div className={styles.modalInnerForm}>
            <div className={styles.formGroup}>
                <input
                    className={styles.formInput}
                    placeholder="Nhập email..."
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                ></input>
            </div>
            <div className={styles.formGroup}>
                <input
                    type="password"
                    className={styles.formInput}
                    value={passwordLogin}
                    placeholder="Nhập password..."
                    onChange={(e) => setPasswordLogin(e.target.value)}
                ></input>
            </div>

            {errLogin && (
                <div className={styles.loginFail}>
                    <GoAlert className={styles.loginFailIcon} />
                    <p className={styles.loginFailText}>Sai thông tin đăng nhập. Vui lòng kiểm tra lại!</p>
                </div>
            )}

            <div className={styles.formControl}>
                <Button outline onClick={handleCloseModal}>
                    Thoát
                </Button>
                <Button primary onClick={handleLogin} disabled={!emailLogin && !passwordLogin ? true : false}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Login;
