import { FaHashtag } from 'react-icons/fa'
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

export default HashTag;
