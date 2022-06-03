import styles from './PopperWrapper.module.scss';

function PopperWrapper({ children }) {
    return <div className={styles.wrapper}>{children}</div>;
}

export default PopperWrapper;
