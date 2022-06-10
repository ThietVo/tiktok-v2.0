import { useSelector } from 'react-redux';
import ModalEditProfile from '~/components/Modal/ModalEditProfile';
import ModalLogin from '~/components/Modal/ModalLogin';
import ModalUpload from '~/components/Modal/ModalUpload';
import { modalSelector } from '~/redux/selectors';

function Modal() {
    const { showModalLogin, showModalUpload, showModalEditProfile } = useSelector(modalSelector);
    return ( 
        <>
            {showModalLogin && <ModalLogin />}
            { showModalUpload && <ModalUpload />}
            {showModalEditProfile && <ModalEditProfile />}
        </>
     );
}

export default Modal;