import { FaTiktok, FaBook, FaKeyboard } from 'react-icons/fa';
import { FiSettings, FiLogOut, FiHelpCircle } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import Tippy from '@tippyjs/react';

import styles from './RightHeaderLogged.module.scss';
import { useSelector } from 'react-redux';
import { usersSelector } from '~/redux/selectors';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu/Menu';

 

function RightHeaderLogged() {
    const { userLogged } = useSelector(usersSelector);

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
        {
            icon: <FiLogOut />,
            title: 'Đăng xuất',
            to: '/logout',
            separate: true,
        },
    ];
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };
    return ( 
        <div className={styles.wrapper}>
            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                    <Link to="/upload" className={styles.actionBtn}>
                        <BiCloudUpload />
                    </Link>
                </Tippy>

            <Menu items={userItem} onChange={handleMenuChange}>
                <img className={styles.avatar} src={userLogged.avatar} alt={userLogged.username} />
            </Menu>
        </div>
     );
}

export default RightHeaderLogged;