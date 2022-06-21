import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import layoutSlice from '~/redux/layoutSlice';
import styles from './Feedback.module.scss';

function Feedback() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [])
    
    return ( 
        <div>Feedback</div>
     );
}

export default Feedback;