import React from 'react';
import classNames from 'classnames/bind';
import styles from './PositionSmartPhone.module.scss';
import ip15 from '~/assets/images/ip15.png';

const cx = classNames.bind(styles);
const PositionSmartPhone = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <img src={ip15} alt="ip15" className={cx('image-ip')} />
            <div className={cx('position')}>{children}</div>
        </div>
    );
};

export default PositionSmartPhone;
