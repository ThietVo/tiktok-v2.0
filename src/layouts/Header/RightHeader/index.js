import { FaEllipsisV, FaBook, FaKeyboard } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import styles from './RightHeader.module.scss';

import modalSlice from '~/redux/modalSlice';

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

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const handleClickLoginBtn = () => {
        dispatch(modalSlice.actions.setModalLogin(true));
    };

    return (
        <div className={styles.wrapper}>
            <Button text onClick={() => dispatch(modalSlice.actions.setModalLogin(true))}>
                        Tải lên
                    </Button>
                    <Button primary onClick={handleClickLoginBtn}>
                        Đăng nhập
                    </Button>

            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
            <button className={styles.moreBtn}>
                        <FaEllipsisV />
                    </button>
            </Menu>
        </div>
    );
}

export default RightHeader;
