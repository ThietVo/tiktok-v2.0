import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper} from '~/components/Popper/Wrapper';
import MenuItem from '~/components/Popper/Menu/MenuItem';
import MenuHeader from './MenuHeader';

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
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
                    }}
                />
            );
        });
    }

    return ( 
        <Tippy
            interactive
            delay={[0, 700]}
            placement="bottom-end"
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
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
     );
}

export default Menu;