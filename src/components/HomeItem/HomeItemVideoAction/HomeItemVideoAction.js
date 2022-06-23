import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FaCommentDots, FaShare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { usersSelector } from '~/redux/selectors';
import modalSlice from '~/redux/modalSlice';
import styles from './HomeItemVideoAction.module.scss';
import Heart from '~/components/Heart';
import { getCommentOfVideoApi } from '~/callApi/commentsApi';
import videosSlice from '~/redux/videosSlice';

function HomeItemVideoAction({ index, video }) {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            getCommentOfVideoApi(video.id).then((data) => setComments(data));
        }, 500);
    }, []);

    const handleCommentVideo = () => {
        if (!userLogged.id) {
            dispatch(modalSlice.actions.setModalLogin(true));
        } else {
            dispatch(modalSlice.actions.setModalVideoDetail(true));
            dispatch(videosSlice.actions.setIndexCurrentVideo(index));
        }
    };

    return (
        <div className={styles.videoAction}>
            <div>
                <Heart video={video} styleHeart={'heartMedium'} />
            </div>
            <button type="button" className={clsx(styles.videoActionBtn, styles.videoActionBtnComment)}>
                <div className={styles.videoActionIcon} onClick={handleCommentVideo}>
                    <FaCommentDots />
                </div>
                <strong>{comments ? comments.length : 0}</strong>
            </button>
            <button type="button" className={clsx(styles.videoActionBtn, styles.videoActionBtnShare)}>
                <div className={styles.videoActionIcon}>
                    <FaShare />
                </div>
                <strong>{video.shares}</strong>
            </button>
        </div>
    );
}

HomeItemVideoAction.propTypes = {
    index: PropTypes.number.isRequired,
    video: PropTypes.object.isRequired,
};

export default HomeItemVideoAction;
