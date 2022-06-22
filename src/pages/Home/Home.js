import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Home.module.scss';
import HomeItem from '~/components/HomeItem';
import videosSlice from '~/redux/videosSlice';
import { getVideosWithUsersApi } from '~/callApi/videosApi';
import { usersSelector, videosSelector } from '~/redux/selectors';
import layoutSlice from '~/redux/layoutSlice';
// import MobileHeader from "../MobileResponsive/MobileHeader";

function Home() {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);
    const { videosWithUsers } = useSelector(videosSelector);

    useEffect(() => {
        getVideosWithUsersApi().then((result) => {
            const arr = result.filter((element) => element.hasPublic === true && element.user.id !== userLogged.id);
            dispatch(videosSlice.actions.setVideosWithUsers(arr.sort(() => Math.random() - 0.5)));
        });
        document.title = 'Tiktok - Make Your Day';

        dispatch(layoutSlice.actions.setHasClassContainer(true));
    }, [userLogged.id]);

    return (
        <div className={styles.homeMain}>
            {/* mobile responsive */}
            {/* <MobileHeader /> */}

            {videosWithUsers &&
                videosWithUsers.map((video, index) => {
                    return <HomeItem key={index} index={index} user={video.user} video={video} FollowBtn={true} />;
                })}
        </div>
    );
}

export default Home;
