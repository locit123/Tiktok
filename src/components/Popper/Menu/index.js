import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Menu = ({ children, items = [], onChange = defaultFn, hideOnClick = false }) => {
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
                                title={isParent2 ? current.title : current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                    setIsParent2(false);
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
                setIsParent2(false);
            }}
            hideOnClick={hideOnClick}
        >
            {children}
        </Tippy>
    );
};

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.func,
    items: PropTypes.array,
};

export default Menu;
