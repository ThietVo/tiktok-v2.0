import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase';

import modalSlice from '~/redux/modalSlice';
import Button from '~/components/Button';
import styles from './ModalLogin.module.scss';
import { createUserApi, filterUsersByEmail } from '~/callApi/usersApi';
import { useDebounce } from '~/hooks';

function Register() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [emailErr, setEmailErr] = useState();
    const [ emailExisted, setEmailExisted ] = useState();
    const [passwordErr, setPasswordErr] = useState();
    const [passwordAgainErr, setPasswordAgainErr] = useState();

    const debounced = useDebounce(email, 500);

    useEffect(() => {
        filterUsersByEmail(email).then(result => {
            if(result.length > 0){
                setEmailExisted(true);
            }else {
                setEmailExisted(false);
            }
        })
    }, [debounced])

    const handleCloseModal = () => {
        dispatch(modalSlice.actions.setModalLogin(false));
    };

    const handleEmailInput = (e) => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (e.target.value.match(emailFormat)) {
            setEmailErr(false);
        } else {
            setEmailErr(true);
        }
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e) => {
        if (e.target.value.length < 6) {
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
        setPassword(e.target.value);

        if (passwordAgain !== e.target.value) {
            setPasswordAgainErr(true);
        } else {
            setPasswordAgainErr(false);
        }
    };

    const handlePasswordAgainInput = (e) => {
        if (e.target.value !== password) {
            setPasswordAgainErr(true);
        } else {
            setPasswordAgainErr(false);
        }
        setPasswordAgain(e.target.value);
    };

    const handleCreateUser = () => {
        if (!passwordErr && !passwordAgainErr && !emailErr && !emailExisted) {
            createUserWithEmailAndPassword(auth, email, password).then((currentUser) => {
                const id = currentUser.user.uid;
                const data = {
                    id: id,
                    email: email,
                    password: password,
                    tiktokid: `user${id}`,
                    username: `user${id}`,
                    verified: false,
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/tiktok-49d46.appspot.com/o/images%2Favatar%2Fdefaultavatar.png?alt=media&token=3cbbec38-faa7-4335-8bad-c321f3e3743e',
                    info: '',
                    following: [],
                    followers: [],
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString()
                };
                createUserApi(data);
            });
            dispatch(modalSlice.actions.setModalLogin(false));
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formGroup}>
                <input
                    className={styles.formInput}
                    placeholder="Nhập email..."
                    value={email}
                    onChange={handleEmailInput}
                ></input>
            </div>
            {emailExisted && <div className={styles.alertError}>Email đã tồn tại!</div>}
            {emailErr && <div className={styles.alertError}>Email không hợp lệ!</div>}
            <div className={styles.formGroup}>
                <input
                    type="password"
                    className={styles.formInput}
                    value={password}
                    placeholder="Nhập password..."
                    onChange={handlePasswordInput}
                ></input>
            </div>
            {passwordErr && <div className={styles.alertError}>Mật khẩu phải lớn hơn 6 ký tự.</div>}
            <div className={styles.formGroup}>
                <input
                    type="password"
                    className={styles.formInput}
                    value={passwordAgain}
                    placeholder="Nhập lại password..."
                    onChange={handlePasswordAgainInput}
                ></input>
            </div>
            {passwordAgainErr && <div className={styles.alertError}>Mật khẩu không khớp.</div>}
            <div className={styles.formControl}>
                <Button outline onClick={handleCloseModal}>
                    Thoát
                </Button>
                <Button primary onClick={handleCreateUser} disabled={!email ? true : false}>
                    Đăng ký
                </Button>
            </div>
        </div>
    );
}

export default Register;
