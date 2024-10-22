import React from 'react';
import { SupportIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './EditCoverVideoUpload.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const EditCoverVideoUpload = ({ src, isUpLoading }) => {
    return (
        <div className={cx('box-cover')}>
            <div className={cx('box-text-cover')}>
                <span className={cx('text-cover')}>Cover</span>
                <SupportIcon className={cx('icon')} />
            </div>
            <div className={cx('current-video')}>
                {isUpLoading ? (
                    <div className={cx('box-loading')}>
                        <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                    </div>
                ) : (
                    <video src={src} className={cx('video')}>
                        <source src={src} type="mp4"></source>
                    </video>
                )}
                <div className={cx('text-edit')}>
                    <span className={cx('edit')}>Edit cover</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(EditCoverVideoUpload);
