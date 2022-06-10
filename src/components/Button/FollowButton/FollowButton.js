import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FollowButton.module.scss';
import Button from '~/components/Button';

import { updateUserApi } from '~/callApi/usersApi';

import modalSlice from '~/redux/modalSlice';
import { userLoginSelector } from '~/redux/selectors';

import userLoginSlice from '~/redux/userLoginSlice';

function FollowButton({ user }) {
    const dispatch = useDispatch();
    const { userLogged } = useSelector(userLoginSelector);
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        if (userLogged.following && userLogged.following.includes(user.id)) {
            setIsFollow(true);
        } else {
            setIsFollow(false);
        }
    }, [user.id, userLogged]);

    const handleClickFollowBtn = () => {
        if (!userLogged.id) {
            dispatch(modalSlice.actions.setModalLogin(true));
        } else {
            let followingIds = [];
            let followerIds = [];
            if (!isFollow) {
                followingIds = [...userLogged.following, user.id];
                followerIds = [...user.followers, userLogged.id];
                setIsFollow(true);
            } else {
                followingIds = userLogged.following && userLogged.following.filter((id) => id !== user.id);
                followerIds = user.followers ? user.followers.filter((id) => id !== userLogged.id) : [];
                setIsFollow(false);
            }
            const data1 = {
                ...userLogged,
                following: [...followingIds],
            };
            const data2 = {
                followers: [...followerIds],
            };
            updateUserApi(userLogged.id, data1);
            dispatch(userLoginSlice.actions.setUserLogin(data1));
            setTimeout(() => {
                updateUserApi(user.id, data2);
            }, 500);
        }
    };
    return (
        <div className={styles.wrapper}>
            <Button outline onClick={handleClickFollowBtn}>
                {!isFollow ? 'Follow' : 'Đang Follow'}
            </Button>
        </div>
    );
}

export default FollowButton;
