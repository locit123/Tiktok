import React from 'react';
import { ArrowIcon, ExistIcon, LocationIcon, SupportIcon } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './LocationUpload.module.scss';

const cx = classNames.bind(styles);
const LocationUpload = ({ statusScroll, DATA, LEFT, RIGHT, divRef, handleClickScroll }) => {
    return (
        <>
            <div className={cx('box-location')}>
                <div className={cx('box-text-cover')}>
                    <span className={cx('text-cover')}>Location</span>
                    <SupportIcon className={cx('icon')} />
                </div>
                <div className={cx('location')}>
                    <LocationIcon />
                    <span className={cx('text-location')}>
                        Khach san muong thanh luxyryKhach san muong thanh luxyry
                    </span>
                    <ExistIcon width="1.6rem" height="1.6rem" />
                </div>
            </div>
            <div className={cx('box-scroll')}>
                <div className={cx('wrapper-scroll')} ref={divRef}>
                    <div className={cx('scroll')}>
                        {DATA.map((item, index) => (
                            <div className={cx('items-scroll')} key={index}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>
                {statusScroll === LEFT ? (
                    <div className={cx('ic-right')} onClick={(e) => handleClickScroll(e, RIGHT)}>
                        <ArrowIcon width="1.5rem" height="1.5rem" className={cx('icon-arrow-right')} />
                    </div>
                ) : statusScroll === RIGHT ? (
                    <div className={cx('ic-left')} onClick={(e) => handleClickScroll(e, LEFT)}>
                        <ArrowIcon width="1.5rem" height="1.5rem" className={cx('icon-arrow-left')} />
                    </div>
                ) : (
                    <>
                        <div className={cx('ic-left')} onClick={(e) => handleClickScroll(e, LEFT)}>
                            <ArrowIcon width="1.5rem" height="1.5rem" className={cx('icon-arrow-left')} />
                        </div>
                        <div className={cx('ic-right')} onClick={(e) => handleClickScroll(e, RIGHT)}>
                            <ArrowIcon width="1.5rem" height="1.5rem" className={cx('icon-arrow-right')} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default React.memo(LocationUpload);
