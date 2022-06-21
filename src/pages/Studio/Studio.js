import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import layoutSlice from '~/redux/layoutSlice';
import styles from './Studio.module.scss';

function Studio() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [])
    return ( 
        <div>Studio</div>
     );
}

export default Studio;