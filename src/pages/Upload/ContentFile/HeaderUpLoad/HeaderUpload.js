import React from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './HeaderUpload.module.scss';
import { IconBase64, ReloadIcon } from '~/components/Icons';
const cx = classNames.bind(styles);
const HeaderUpload = ({ fileInfo, uploadDuration, uploadStatus, progressBar }) => {
    return (
        <div className={cx('box-header')}>
            <div className={cx('box-header-left')}>
                <span className={cx('text-left-name')}>{fileInfo.name || 'Demo.mp4'}</span>
                <div className={cx('box-header-left-file')}>
                    <div className={cx('box-size')}>
                        <span className={cx('text-size')}>Size:</span>
                        <span className={cx('size')}>{fileInfo.size || '15.7 MB'}</span>
                    </div>
                    <div className={cx('box-size')}>
                        <span className={cx('text-size')}>Duration:</span>
                        <span className={cx('size')}>{uploadDuration || '-'} s</span>
                    </div>
                </div>
                <div className={cx('box-text-upload')}>
                    <img src={IconBase64.TickIcon} alt="a" />
                    <span>{uploadStatus || 'Uploading...'}</span>
                </div>
            </div>
            <div className={cx('box-header-right')}>
                <Button className={cx('bt')} outline leftIcon={<ReloadIcon />}>
                    Replace
                </Button>
                <span className={cx('text-percent')}>{progressBar}%</span>
            </div>
            <div className={cx('progress-bar')}>
                <div
                    className={cx('run-progress')}
                    style={{
                        width: `${progressBar}%`,
                        backgroundColor: progressBar === 100 ? '#00c39b' : '#fe2c55',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default React.memo(HeaderUpload);
