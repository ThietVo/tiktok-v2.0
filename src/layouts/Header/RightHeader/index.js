import { FaEllipsisV, FaBook, FaKeyboard, FaTiktok } from 'react-icons/fa';
import { FiHelpCircle, FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import styles from './RightHeader.module.scss';
import modalSlice from '~/redux/modalSlice';
import { getUserApi } from '~/callApi/usersApi';
import userLoginSlice from '~/redux/userLoginSlice';
import { userLoginSelector } from '~/redux/selector';

const MENU_ITEMS = [
    {
        icon: <FaBook />,
        title: 'Tiếng Việt',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FiHelpCircle />,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback',
    },
    {
        icon: <FaKeyboard />,
        title: 'Phím tắt trên bàn phím',
    },
];

function RightHeader() {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            //if logged -> send id logged to redux
            if (currentUser) {
                setTimeout(() => {
                    getUserApi(currentUser.uid).then((result) => dispatch(userLoginSlice.actions.setUserLogin(result)));
                    //get list videos liked by userLogged and dispatch to redux
                    // getLikedVideosOfUser(currentUser.uid).then((result) => {
                    //   dispatch(likedVideosSlice.actions.setLikedVideos(result));
                    // });
                }, 1000);
            }
        });
    }, [dispatch]);
    

    const { userLogged } = useSelector(userLoginSelector); //get redux
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userItem = [
        {
            icon: <AiOutlineUser />,
            title: 'Xem hồ sơ',
            to: '/@hoaa',
        },
        {
            icon: <FaTiktok />,
            title: 'Nhận xu',
            to: '/coin',
        },
        {
            icon: <FiSettings />,
            title: 'Cài đặt',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FiLogOut />,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];

    const handleClickLoginBtn = () => {
        dispatch(modalSlice.actions.setModalLogin(true));
    };

    console.log(userLogged.id);
    return (
        <div className={styles.wrapper}>
            {userLogged.id ? (
                <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                    <Link to="/upload" className={styles.actionBtn}>
                        <BiCloudUpload />
                    </Link>
                </Tippy>
            ) : (
                <>
                    <Button text>Tải lên</Button>
                    <Button primary onClick={handleClickLoginBtn}>
                        Đăng nhập
                    </Button>
                </>
            )}

            <Menu items={userLogged.id ? userItem : MENU_ITEMS} onChange={handleMenuChange}>
                {userLogged.id ? (
                    <img className={styles.avatar} src={userLogged.avatar} alt={userLogged.username} />
                ) : (
                    <button className={styles.moreBtn}>
                        <FaEllipsisV />
                    </button>
                )}
            </Menu>
        </div>
    );
}

export default RightHeader;
