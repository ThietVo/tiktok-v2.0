import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ModalDeleteComment from '~/components/Modal/ModalDeleteComment';
import ModalDeleteVideo from '~/components/Modal/ModalDeleteVideo';
import ModalEditProfile from '~/components/Modal/ModalEditProfile';
import ModalKeyboardShortcuts from '~/components/Modal/ModalKeyboardShortcuts/ModalKeyboardShortcuts';
import ModalLogin from '~/components/Modal/ModalLogin';
import ModalSetPrivacy from '~/components/Modal/ModalSetPrivacy';
import ModalUpload from '~/components/Modal/ModalUpload';
import ModalVideoDetail from '~/components/Modal/ModalVideoDetail';
import ToastMessage from '~/components/ToastMessage/ToastMessage';
import { modalSelector } from '~/redux/selectors';

function Modal() {
    const {
        showModalLogin,
        showModalUpload,
        showModalEditProfile,
        showModalVideoDetail,
        showModalDeleteComment,
        showToastMessage,
        showModalSetPrivacy,
        showModalDeleteVideo,
        showModalKeyboardShortcuts
    } = useSelector(modalSelector);

    useEffect(() => {
        if (
            showModalLogin ||
            showModalUpload ||
            showModalVideoDetail ||
            showModalDeleteComment ||
            showModalDeleteVideo ||
            showModalEditProfile ||
            showModalSetPrivacy ||
            showModalKeyboardShortcuts
        ) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [
        showModalLogin,
        showModalUpload,
        showModalVideoDetail,
        showModalDeleteComment,
        showModalDeleteVideo,
        showModalEditProfile,
        showModalSetPrivacy,
        showModalKeyboardShortcuts
    ]);
    return (
        <>
            {showModalLogin && <ModalLogin />}
            {showModalUpload && <ModalUpload />}
            {showModalEditProfile && <ModalEditProfile />}
            {showModalVideoDetail && <ModalVideoDetail />}
            {showModalDeleteComment && <ModalDeleteComment />}
            {showToastMessage && <ToastMessage />}
            {showModalSetPrivacy && <ModalSetPrivacy />}
            {showModalDeleteVideo && <ModalDeleteVideo />}
            {showModalKeyboardShortcuts && <ModalKeyboardShortcuts />}
        </>
    );
}

export default Modal;
