import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { FaCheckCircle } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import styles from './UserDetail.module.scss';
import Avatar from '~/components/Avatar';
import { filterUsersByTiktokId } from '~/callApi/usersApi';
import { usersSelector } from '~/redux/selectors';
import FollowButton from '~/components/Button/FollowButton';
import UserDetailVideos from './UserDetailVideos';
import UserDetailLikedVideos from './UserDetailLikedVideos';
import NumLikes from '~/components/NumLikes';
import NumFollowers from '~/components/NumFollowers';
import NumFollowing from '~/components/NumFollowing';
import Button from '~/components/Button';
import modalSlice from '~/redux/modalSlice';
import layoutSlice from '~/redux/layoutSlice';

function UserDetail() {
    const { tiktokid } = useParams();

    const [user, setUser] = useState({});
    const [active, setActive] = useState({
        isVideoTab: true,
        isLikedVideoTab: false,
    });

    const dispatch = useDispatch();
    const { userLogged } = useSelector(usersSelector);

    useEffect(() => {
        //filter user by  tiktokid
        filterUsersByTiktokId(tiktokid).then((result) => {
            document.title = `${result[0].username} (@${result[0].tiktokid}) TikTok | Xem các video mới nhất của ${result.username} trên Tiktok`;
            setUser(result[0]);
        });

        dispatch(layoutSlice.actions.setHasClassContainer(false));
    }, [tiktokid, userLogged]);

    const handleClickTabVideo = () => {
        setActive({
            isVideoTab: true,
            isLikedVideoTab: false,
        });
    };
    const handleClickLikedVideo = () => {
        setActive({
            isVideoTab: false,
            isLikedVideoTab: true,
        });
    };

    const handleClickEditProfileBtn = () => {
        dispatch(modalSlice.actions.setModalEditProfile(true));
    };

    return (
        <div className={styles.userDetail}>
            <div className={styles.userDetailHeader}>
                <div className={clsx('d-flex')}>
                    <Avatar urlImg={user.avatar} avatarExtraLarge />
                    <div className={styles.userDetailHeaderCard}>
                        <div className={styles.userDetailHeaderCardTitle}>
                            {user.tiktokid}
                            {user.verified && <FaCheckCircle className={clsx('checkIconMedium')} />}
                        </div>
                        <div className={styles.userDetailHeaderCardSubTitle}>{user.username}</div>
                        {user.id !== userLogged.id ? (
                            <FollowButton user={user} />
                        ) : (
                            // <ButtonEditProfile />
                            <Button
                                leftIcon={<BiEdit />}
                                className={styles.editProfileBtn}
                                onClick={handleClickEditProfileBtn}
                            >
                                Sửa hồ sơ
                            </Button>
                        )}
                    </div>
                </div>
                <div className={styles.userDetailHeaderQuantity}>
                    <NumFollowing num={user.following && user.following.length ? user.following.length : 0} />
                    <NumFollowers num={user.followers && user.followers.length ? user.followers.length : 0} />
                    <NumLikes userId={user.id} />
                </div>
                <div className={styles.userDetailHeaderDescription}>{user.info}</div>
            </div>
            <div className={styles.userDetailBody}>
                <div className={styles.userDetailBodyTab}>
                    <p
                        className={clsx(styles.userDetailBodyTabItem, {
                            [styles.userDetailBodyTabItemActive]: active.isVideoTab,
                        })}
                        onClick={handleClickTabVideo}
                    >
                        Video
                    </p>
                    <p
                        className={clsx(styles.userDetailBodyTabItem, {
                            [styles.userDetailBodyTabItemActive]: active.isLikedVideoTab,
                        })}
                        onClick={handleClickLikedVideo}
                    >
                        Đã thích
                    </p>
                </div>
                {active.isVideoTab && <UserDetailVideos userDetailId={user.id} />}
                {active.isLikedVideoTab && <UserDetailLikedVideos userDetailId={user.id} />}
            </div>
        </div>
    );
}

export default UserDetail;
