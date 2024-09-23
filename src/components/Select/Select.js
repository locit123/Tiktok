import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { Wrapper as PopperWrapperSelect } from '../Popper';
import { ArrowBottom } from '../Icons';
import { SelectDay, SelectMonth, SelectYear } from './SelectMethods';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Select = ({ label }) => {
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState({ x: 0 });

    const renderResult = (attrs) => (
        <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
            <PopperWrapperSelect className={cx('wrapper-menu-items')}>
                {index.x <= 360 ? (
                    <SelectMonth />
                ) : index.x <= 486 ? (
                    <SelectDay />
                ) : index.x <= 610 ? (
                    <SelectYear />
                ) : (
                    <SelectMonth />
                )}
            </PopperWrapperSelect>
        </div>
    );

    const handleClick = (e) => {
        setVisible(!visible);
        console.log(e);
        setIndex({ x: e.clientX });
    };
    return (
        <Tippy
            onClickOutside={() => setVisible(false)}
            visible={visible}
            interactive
            placement="bottom"
            render={renderResult}
        >
            <div className={cx('wrapper')} onClick={handleClick}>
                <div className={cx('menu')}>{label}</div>
                <div className={cx('icon', { visible })}>
                    <ArrowBottom />
                </div>
            </div>
        </Tippy>
    );
};

export default Select;
