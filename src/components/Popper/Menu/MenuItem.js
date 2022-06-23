import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './Menu.module.scss';
import Button from '~/components/Button';

function MenuItem({ data, onClick }) {
    const classes = clsx(styles.menuItem, {
        [styles.separate]: data.separate
    })
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default MenuItem;
