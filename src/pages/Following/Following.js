import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Following.module.scss';
import FollowingItem from '~/components/FollowingItem';
import HomeItem from '~/components/HomeItem';
import { getUsersWithVideosApi } from '~/callApi/usersApi';
import { userLoginSelector } from '~/redux/selectors';
// import sidebarUserListSlice from "~/redux/sidebarUserListSlice";
import { getVideoWithUserByUserIdApi } from '~/callApi/videosApi';
import videosSlice from '~/redux/videosSlice';
// import sidebarSlice from "`../..`/redux/sidebarSlice";
// import MobileHeader from "../MobileResponsive/MobileHeader";

function Following() {
    const [userVideoList, setUserVideoList] = useState([]);
    const dispatch = useDispatch();
    const { userLogged } = useSelector(userLoginSelector);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        document.title = 'Đang follow - Xem video từ những nhà sáng tạo mà bạn follow | Tiktok';
        // dispatch(sidebarUserListSlice.actions.setShowSidebarUserList(false));
        // dispatch(sidebarSlice.actions.setClassContainer(true));
    }, []);

    useEffect(() => {
        if (!userLogged.id) {
            getUsersWithVideosApi().then((result) => setUserVideoList(result));
        } else {
            userLogged.following &&
                userLogged.following.map((id) => {
                    getVideoWithUserByUserIdApi(id).then((result) => {
                        const arr = result.filter((element) => element.hasPublic === true);
                        setVideos((prev) => [...prev, ...arr]);
                    });
                });
        }
    }, [userLogged]);

    useEffect(() => {
        const arr = [...videos].sort(() => Math.random() - 0.5);
        dispatch(videosSlice.actions.setVideosWithUsers(arr));
    }, [videos]);

    //trộn ngẫu nhiên các phần tử mảng
    const shuffledArr = userVideoList.sort(() => Math.random() - 0.5);

    return (
        <div className={styles.following}>
            {/* <MobileHeader /> */}

            {!userLogged.id
                ? shuffledArr.map((user, index) => {
                      return <FollowingItem user={user} key={index} />;
                  })
                : videos &&
                  videos.map((element, index) => (
                      <HomeItem user={element.user} video={element} index={index} key={index} FollowBtn={false} />
                  ))}
        </div>
    );
}

export default Following;
