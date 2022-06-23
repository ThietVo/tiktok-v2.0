import { FaHashtag } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './HashTag.module.scss';


function HashTag({ text }) {
    return (
        <a href="#" className={styles.hashtag}>
            <FaHashtag />
            <p className={styles.hashtagText}>
                {text}
            </p>
        </a>
    )
}

HashTag.propTypes = {
    text: PropTypes.string.isRequired,
}

export default HashTag;
