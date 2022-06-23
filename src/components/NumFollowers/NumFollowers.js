import PropTypes from 'prop-types';

import styles from './NumFollowers.module.scss';

function NumFollowers({ num }) {
    return (
        <div className={styles.numFollowers}>
            <strong className={styles.numFollowersText}>{num}</strong> Follower
        </div>
    );
}

NumFollowers.propTypes = {
    num: PropTypes.number.isRequired,
};

export default NumFollowers;
