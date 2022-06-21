import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import layoutSlice from '~/redux/layoutSlice';
import styles from './Analytics.module.scss';

function Analytics() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [])

    return ( 
        <div className={styles.wrapper}>Analytics</div>
     );
}

export default Analytics;