import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Home.module.scss';
import HomeItem from '~/components/HomeItem';
// import sidebarUserListSlice from "../../redux/sidebarUserListSlice";
import videosSlice from '~/redux/videosSlice';
import { getVideosWithUsersApi } from '~/callApi/videosApi';
import { userLoginSelector } from '~/redux/selectors';
// import sidebarSlice from "../../redux/sidebarSlice";
// import MobileHeader from "../MobileResponsive/MobileHeader";

function Home() {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(userLoginSelector);
    const [videosWithUsers, setVideosWithUsers] = useState([]);

    useEffect(() => {
        getVideosWithUsersApi().then((result) => {
            const arr = result.filter((element) => element.hasPublic === true && element.user.id !== userLogged.id);
            setVideosWithUsers(arr.sort(() => Math.random() - 0.5));
            dispatch(videosSlice.actions.setVideosWithUsers(arr));
        });
        document.title = 'Tiktok - Make Your Day';
        // dispatch(sidebarUserListSlice.actions.setShowSidebarUserList(true));
        // dispatch(sidebarSlice.actions.setClassContainer(true));
    }, [userLogged]);

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
