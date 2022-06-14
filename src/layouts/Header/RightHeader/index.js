import { FaEllipsisV, FaBook, FaKeyboard, FaTiktok } from 'react-icons/fa';
import { FiHelpCircle, FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import styles from './RightHeader.module.scss';

import modalSlice from '~/redux/modalSlice';
import { usersSelector } from '~/redux/selectors';



function RightHeader() {
    const dispatch = useDispatch();

    const { userLogged } = useSelector(usersSelector); //get redux

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

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
    
    const userItem = [
        {
            icon: <AiOutlineUser />,
            title: 'Xem hồ sơ',
            to: `/@${userLogged.tiktokid}`,
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
                    <Button text onClick={() => dispatch(modalSlice.actions.setModalLogin(true))}>
                        Tải lên
                    </Button>
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
