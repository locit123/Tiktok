import React from 'react';
import { AConIcon, HashtagsIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './DescriptonUpload.module.scss';

const cx = classNames.bind(styles);
const DescriptionUpload = ({ value, onChange }) => {
    return (
        <div className={cx('box-footer-left-top')}>
            <h3 className={cx('text-description')}>Description</h3>
            <div className={cx('box-text-description')}>
                <div className={cx('input-text')}>
                    <textarea
                        className={cx('ip')}
                        value={value}
                        onChange={onChange}
                        placeholder="Share more about your video here..."
                    />
                </div>
                <div className={cx('box-tags')}>
                    <div className={cx('box-tags-left')}>
                        <div className={cx('box-1')}>
                            <HashtagsIcon />
                            <span className={cx('text-tag')}>Hashtags</span>
                        </div>
                        <div className={cx('box-1')}>
                            <AConIcon width="1.2rem" height="1.2rem" />
                            <span className={cx('text-tag')}>Mention</span>
                        </div>
                    </div>
                    <span>{value.length || 0}/4000</span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionUpload;
