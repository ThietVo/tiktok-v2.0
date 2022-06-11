import { useSelector } from 'react-redux';
import ModalDeleteComment from '~/components/Modal/ModalDeleteComment';
import ModalDeleteVideo from '~/components/Modal/ModalDeleteVideo';
import ModalEditProfile from '~/components/Modal/ModalEditProfile';
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
        showModalDeleteVideo
    } = useSelector(modalSelector);
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
        </>
    );
}

export default Modal;
