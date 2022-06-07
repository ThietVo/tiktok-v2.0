import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import userLoginSlice from '~/redux/userLoginSlice';

function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        signOut(auth);
        navigate('/');
        dispatch(userLoginSlice.actions.setUserLogin(''))
    }, [])
    // dispatch(sidebarSlice.actions.setShowSidebar(true));
    return ( <></> );
}

export default LogOut;