import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { MdClose, MdCheck } from 'react-icons/md';
import { BiPencil, BiError } from 'react-icons/bi';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

import styles from './ModalEditProfile.module.scss';
import Modal from '../Modal';
import { usersSelector } from '~/redux/selectors';
import modalSlice from '~/redux/modalSlice';
import { filterUsersByTiktokId, updateUserApi } from '~/callApi/usersApi';
import usersSlice from '~/redux/usersSlice';
import { useDebounce } from '~/hooks';

function ModalEditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userLogged } = useSelector(usersSelector);
    const [avatar, setAvatar] = useState(userLogged.avatar);
    const [tiktokid, setTiktokId] = useState(userLogged.tiktokid);
    const [username, setUsername] = useState(userLogged.username);
    const [info, setInfo] = useState(userLogged.info);

    //useDebounce
    const debounced = useDebounce(tiktokid, 500);

    const storage = getStorage();
    //save url firebase of Avatar uploaded
    const [urlFirebaseAvatar, setUrlFirebaseAvatar] = useState();
    //save flag check tiktokid have exist?
    const [isExist, setIsExist] = useState(null);

    useEffect(() => {
        if (tiktokid !== userLogged.tiktokid) {
            filterUsersByTiktokId(debounced).then((result) => {
                if (result.length > 0 || debounced === '') {
                    setIsExist(true);
                } else {
                    setIsExist(false);
                }
            });
        }
    }, [debounced]);

    //Click Close button on Header modal
    const handleCloseModal = () => {
        dispatch(modalSlice.actions.setModalEditProfile(false));
    };
    //Click Cancel button on Footer modal
    const handleCancelEdit = () => {
        dispatch(modalSlice.actions.setModalEditProfile(false));
    };
    //Click Save button on Footer modal
    const handleSaveEdit = () => {
        if (!isExist) {
            handleUploadAvatarToFirebase(avatar, () => {
                handleUploadUser();
            });
            setTimeout(() => {
                dispatch(modalSlice.actions.setModalEditProfile(false));
                navigate(`/@${tiktokid}`);
                navigate(0);
            }, 500);
        }
    };
    //handle input file avatar
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };
    //handle upload avatar to firebase storage
    const handleUploadAvatarToFirebase = (image, callback) => {
        //if have exist input file avatar -> handle...
        if (image.preview) {
            const randomName = 'avatar';
            const storageRef = ref(storage, `images/${userLogged.id}/${randomName}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrlFirebaseAvatar(downloadURL);
                    });
                },
            );
        }
        callback();
    };
    //handle edit tiktok ID
    const handleChangeTiktokId = (e) => {
        //dont input space first letter
        if(!e.target.value.startsWith(' ')){
            setTiktokId(e.target.value);
        }
    };
    //handle update database
    const handleUploadUser = () => {
        const data = {
            avatar: urlFirebaseAvatar,
            tiktokid: tiktokid,
            username: username,
            info: info,
        };
        updateUserApi(userLogged.id, data);
        //update redex user logged
        dispatch(usersSlice.actions.updateUserLogin(data));
    };
    return (
        <Modal>
            <div className={styles.profile}>
                {/* Header */}
                <div className={styles.profileHeader}>
                    <p className={styles.profileHeaderText}>Sửa hồ sơ</p>
                    <button className={styles.profileHeaderClose} onClick={handleCloseModal}>
                        <MdClose className={styles.profileHeaderCloseIcon} />
                    </button>
                </div>
                {/* Body */}
                <div className={styles.profileBody}>
                    {/* Avatar */}
                    <div className={styles.profileBodyItem}>
                        <div className={styles.profileBodyItemLable}>Ảnh hồ sơ</div>
                        <div className={styles.profileBodyItemAvatar}>
                            <img src={avatar.preview || avatar} alt="" />
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.profileBodyItemAvatarInput}
                                onChange={handleChangeAvatar}
                            ></input>
                            <div className={styles.profileBodyItemAvatarBtn}>
                                <BiPencil className={styles.profileBodyItemAvatarBtnIcon} />
                            </div>
                        </div>
                    </div>
                    {/* Tiktok ID */}
                    <div className={styles.profileBodyItem}>
                        <div className={styles.profileBodyItemLable}>Tiktok ID</div>
                        <div className={styles.profileBodyItemAreaContainer}>
                            <div className={styles.profileBodyItemAreaContainerTiktokid}>
                                <input
                                    type="text"
                                    placeholder="Tiktok ID"
                                    style={isExist ? { border: '1px solid rgb(218, 25, 25)' } : { border: 'none' }}
                                    value={tiktokid}
                                    onChange={handleChangeTiktokId}
                                ></input>
                                {isExist === null ? (
                                    ''
                                ) : isExist ? (
                                    <BiError className={styles.profileBodyItemAreaContainerTiktokidError} />
                                ) : (
                                    <MdCheck className={styles.profileBodyItemAreaContainerTiktokidCheck} />
                                )}
                            </div>
                            <p>{`www.tiktok.com/@${tiktokid}`}</p>
                            <p>
                                TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. Khi thay đổi
                                TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi.
                            </p>
                        </div>
                    </div>
                    {/* Username */}
                    <div className={styles.profileBodyItem}>
                        <div className={styles.profileBodyItemLable}>Tên</div>
                        <div className={styles.profileBodyItemAreaContainer}>
                            <input
                                type="text"
                                placeholder="Tên"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    {/* Info */}
                    <div className={styles.profileBodyItem}>
                        <div className={styles.profileBodyItemLable}>Tiểu sử</div>
                        <div className={styles.profileBodyItemAreaContainer}>
                            <textarea
                                type="text"
                                placeholder="Tiểu sử"
                                maxLength="80"
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                            ></textarea>
                            <p>{`${info && info.length}/80`}</p>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className={styles.profileFooter}>
                    <button className={styles.profileFooterCancel} onClick={handleCancelEdit}>
                        Hủy
                    </button>
                    <button
                        className={clsx(styles.profileFooterSave, {
                            [styles.btnDisable]:
                                !avatar.preview &&
                                tiktokid === userLogged.tiktokid &&
                                username === userLogged.username &&
                                info === userLogged.info
                                    ? true
                                    : false,
                        })}
                        onClick={handleSaveEdit}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalEditProfile;
