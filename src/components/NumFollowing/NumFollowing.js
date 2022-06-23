import PropTypes from 'prop-types';

import styles from './NumFollowing.module.scss';

function NumFollowing({ num }) {
    return (
        <div className={styles.numFollowing}>
            <strong className={styles.numFollowingText}>{num}</strong> Follower
        </div>
    );
}

NumFollowing.propTypes = {
    num: PropTypes.number.isRequired,
};

export default NumFollowing;
