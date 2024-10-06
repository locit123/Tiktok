import classNames from 'classnames/bind';
import styles from './FloatingPlayer.module.scss';
import { FloatingPlayerIcon } from '~/components/Icons';
import React from 'react';

const cx = classNames.bind(styles);
const FloatingPlayer = ({ handleClickTogglePicture }) => {
    return (
        <div className={cx('wrapper')} onClick={handleClickTogglePicture}>
            <FloatingPlayerIcon />
        </div>
    );
};

export default React.memo(FloatingPlayer);
