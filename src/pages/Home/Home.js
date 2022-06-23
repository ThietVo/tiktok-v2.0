import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Home.module.scss';
import HomeItem from '~/components/HomeItem';
import videosSlice from '~/redux/videosSlice';
import { getVideosWithUsersApi } from '~/callApi/videosApi';
import { usersSelector } from '~/redux/selectors';
import layoutSlice from '~/redux/layoutSlice';

function Home() {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);
    const [ videosWithUsers, setVideosWithUsers ] = useState();

    useEffect(() => {
        getVideosWithUsersApi().then((result) => {
            const arr = result.filter((element) => element.hasPublic === true && element.user.id !== userLogged.id);
            setVideosWithUsers(arr.sort(() => Math.random() - 0.5));
            dispatch(videosSlice.actions.setVideosWithUsers(arr));
        });
        document.title = 'Tiktok - Make Your Day';

        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, [userLogged.id]);

    return (
        <div className={styles.homeMain}>

            {videosWithUsers &&
                videosWithUsers.map((video, index) => {
                    return <HomeItem key={index} index={index} user={video.user} video={video} FollowBtn={true} />;
                })}
        </div>
    );
}

export default Home;
