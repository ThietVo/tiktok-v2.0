import clsx from 'clsx';
import styles from './Wrapper.module.scss';

function Wrapper({ children, className }) {
    return <div className={clsx(styles.wrapper, className)}>{children}</div>;
}

export { Wrapper };
