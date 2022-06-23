import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import usersSlice from '~/redux/usersSlice';

function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        signOut(auth);
        navigate('/');
        dispatch(usersSlice.actions.setUserLogin(''))
    }, [])
    return ( <></> );
}

export default LogOut;