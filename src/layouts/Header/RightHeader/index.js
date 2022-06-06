import { FaEllipsisV, FaBook, FaKeyboard, FaTiktok } from 'react-icons/fa';
import { FiHelpCircle, FiSettings, FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import styles from './RightHeader.module.scss';
import { Link } from 'react-router-dom';

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
    const userLogged = true;
    const url = require('~/assets/images/logo.svg.png');
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

    return (
        <div className={styles.wrapper}>
            {userLogged ? (
                <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                    <Link to="/upload" className={styles.actionBtn}>
                        <BiCloudUpload />
                    </Link>
                </Tippy>
            ) : (
                <>
                    <Button text>Tải lên</Button>
                    <Button primary>Đăng nhập</Button>
                </>
            )}

            <Menu items={userLogged ? userItem : MENU_ITEMS} onChange={handleMenuChange}>
                {userLogged ? (
                    <img className={styles.avatar}
                    src={url}
                    alt="Nguyen Van A"/>
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
