import { useSelector } from 'react-redux';
import ModalLogin from '~/components/Modal/ModalLogin';
import ModalUpload from '~/components/Modal/ModalUpload';
import { modalSelector } from '~/redux/selectors';

function Modal() {
    const { showModalLogin, showModalUpload } = useSelector(modalSelector);
    return ( 
        <>
            {showModalLogin && <ModalLogin />}
            { showModalUpload && <ModalUpload />}
        </>
     );
}

export default Modal;