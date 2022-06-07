import { useSelector } from 'react-redux';
import ModalLogin from '~/components/Modal/ModalLogin';
import { modalSelector } from '~/redux/selector';

function Modal() {
    const { showModalLogin } = useSelector(modalSelector);
    return ( 
        <>
            {showModalLogin && <ModalLogin />}
        </>
     );
}

export default Modal;