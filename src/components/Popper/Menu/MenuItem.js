import styles from './Menu.module.scss';
import Button from '~/components/Button';

function MenuItem({ data, onClick }) {
    return (
        <Button className={styles.menuItem} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
