import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SelectWatchVideo.module.scss';
import Tippy from '@tippyjs/react/headless';
import { ArrowIcon, TickIcon } from '~/components/Icons';
import { Wrapper } from '~/components/Popper';
import { FRIENDS, PRIVATE, PUBLIC } from '~/utils/contantValue';

const cx = classNames.bind(styles);
const OPTION = [
    { title: PUBLIC, isCheck: true },
    { title: FRIENDS, isCheck: false },
    { title: PRIVATE, isCheck: false },
];
const SelectWatchVideo = ({ setViewAble, viewAble }) => {
    const [options, setOptions] = useState(OPTION);
    const handleClick = (titleOption) => {
        let updateOption = options.map((option) => {
            return option.title === titleOption ? { ...option, isCheck: true } : { ...option, isCheck: false };
        });
        setOptions(updateOption);
        setViewAble(titleOption);
    };

    const renderTippy = (attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
            <Wrapper className={cx('wrapper-menu')}>
                {options.map((item, index) => (
                    <div className={cx('menu')} key={index} onClick={() => handleClick(item.title)}>
                        <span>
                            {item.title === PUBLIC
                                ? 'Every One'
                                : item.title === PRIVATE
                                ? 'Only You'
                                : item.title === FRIENDS
                                ? 'Friends'
                                : item.title === PUBLIC}
                        </span>
                        {item.isCheck && <TickIcon className={cx('icon-tick')} />}
                    </div>
                ))}
            </Wrapper>
        </div>
    );
    return (
        <div className={cx('wrapper')}>
            <Tippy trigger="click" hideOnClick interactive render={renderTippy}>
                <div className={cx('box-option')}>
                    <span>
                        {viewAble === PUBLIC
                            ? 'Every One'
                            : viewAble === PRIVATE
                            ? 'Only You'
                            : viewAble === FRIENDS
                            ? 'Friends'
                            : viewAble === PUBLIC}
                    </span>
                    <ArrowIcon width="1.7rem" height="1.7rem" />
                </div>
            </Tippy>
        </div>
    );
};

export default React.memo(SelectWatchVideo);
