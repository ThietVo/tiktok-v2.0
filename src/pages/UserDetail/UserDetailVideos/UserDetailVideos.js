import { useEffect } from 'react';
import UserDetailVideo from '../UserDetailVideo';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './UserDetailVideos.module.scss';
import { usersSelector, videosSelector } from '~/redux/selectors';
import { getVideosOfUserApi } from '~/callApi/videosApi';
import videosSlice from '~/redux/videosSlice';

function UserDetailVideos({ userDetailId }) {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);
    const { videosWithUsers } = useSelector(videosSelector);

    useEffect(() => {
        //get videos of user with userDetailId
        getVideosOfUserApi(userDetailId).then((result) => {
            const arr = //filter videos
                userDetailId === userLogged.id ? result : result.filter((element) => element.hasPublic === true);
            dispatch(videosSlice.actions.setVideosWithUsers(arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))); //update redux save videos
        });
    }, [userDetailId]);

    return (
        <div className={styles.userDetailVideos}>
            {videosWithUsers &&
                videosWithUsers.map((video, index) => <UserDetailVideo video={video} key={index} index={index} />)}
        </div>
    );
}

UserDetailVideos.propTypes = {
    userDetailId: PropTypes.string,
};

export default UserDetailVideos;
