import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper/Wrapper';
import MenuItem from '~/components/Popper/Menu/MenuItem';
import MenuHeader from './MenuHeader';
import modalSlice from '~/redux/modalSlice';


const defaultFn = () => {};

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const dispatch = useDispatch()
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                        if(item.title === 'Phím tắt trên bàn phím'){
                            dispatch(modalSlice.actions.setModalKeyboardShortcuts(true));
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={styles.menuList} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={styles.menuPopper}>
                        {history.length > 1 && (
                            <MenuHeader
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        <div className={styles.menuBody}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;
