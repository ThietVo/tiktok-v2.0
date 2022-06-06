import { FaEllipsisV, FaBook, FaKeyboard } from 'react-icons/fa';
import { FiHelpCircle } from 'react-icons/fi';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu/Menu';
import styles from './RightHeader.module.scss';

const MENU_ITEMS = [
    {
        icon: <FaBook />,
        title: 'English',
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
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FaKeyboard />,
        title: 'Keyboard shortcuts',
    },
];

function RightHeader() {

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
            <Button text>Tải lên</Button>
            <Button primary>Đăng nhập</Button>

            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                <button className={styles.moreBtn}>
                    <FaEllipsisV />
                </button>
            </Menu>
        </div>
    );
}

export default RightHeader;
