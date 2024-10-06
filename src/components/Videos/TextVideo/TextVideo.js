import classNames from 'classnames/bind';
import styles from './TextVideo.module.scss';
import { MusicIcon } from '~/components/Icons';
import React from 'react';

const cx = classNames.bind(styles);
const TextVideo = ({ labelHeader, calculatedWidth, isMore, labelBody, labelFooter, handleClickMore }) => {
    return (
        <div className={cx('text-video')}>
            <div className={cx('text-video-left')}>
                <h3 className={cx('text-header')}>{labelHeader}</h3>
                <h3
                    style={{ width: `${calculatedWidth > 0 ? calculatedWidth : 0}px` }}
                    className={cx('text-footer', { isMore })}
                >
                    {labelBody}
                </h3>
                <h3
                    style={{ width: `${calculatedWidth > 0 ? calculatedWidth : 0}px` }}
                    className={cx('text-body', 'text-footer')}
                >
                    <MusicIcon />
                    <span className={cx('title')}>{labelFooter}</span>
                </h3>
            </div>
            <div className={cx('text-footer')} onClick={handleClickMore}>
                {isMore ? 'less' : 'more'}
            </div>
        </div>
    );
};

export default React.memo(TextVideo);
