import { useEffect } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "~/redux/layoutSlice";
import styles from './Live.module.scss';

function Live() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [])
    return ( <div className={styles.wrapper}>Live</div> );
}

export default Live;