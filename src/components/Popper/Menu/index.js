import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Menu = ({ children, items = [], onChange = defaultFn }) => {
    const [history, setHistory] = useState([{ data: items }]);
    const [isParent2, setIsParent2] = useState(false);

    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const isParentTwo = !!item.children2;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setIsParent2(false);
                            setHistory((prev) => [...prev, item.children]);
                        } else if (isParentTwo) {
                            setIsParent2(isParentTwo);
                            setHistory((prev) => [...prev, item.children2]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 500]}
            offset={[12, 10]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex={'-1'} {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={isParent2 ? 'Dark more' : 'Language'}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                    setIsParent2(false);
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
                setIsParent2(false);
            }}
        >
            {children}
        </Tippy>
    );
};

export default Menu;
