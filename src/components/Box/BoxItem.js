import classNames from 'classnames/bind';
import styles from './BoxItem.module.scss';
import React, { useEffect, useRef } from 'react';
import { TickIcon } from '../Icons';
import Button from '../Button';
const cx = classNames.bind(styles);
const BoxItem = ({ type, visible, src, avatar, labelUsername, labelNickname, isCheck, hiddenAvatar = false }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        let currentRef = videoRef.current;
        if (currentRef && visible) {
            currentRef.play().catch((e) => console.log('error', e));
        } else if (currentRef.paused) {
            currentRef.currentTime = 0;
            currentRef.pause();
        }
        return () => {
            if (currentRef) {
                currentRef.pause();
            }
        };
    }, [visible]);
    return (
        <div className={cx('wrapper')}>
            <video ref={videoRef} src={src} muted loop className={cx('video')}>
                <source src={src} type={type} />
                Your browser does not support the video tag.
            </video>
            <div className={cx('box-body')}>
                <img src={avatar} alt="a" className={cx('avatar', { hiddenAvatar })} />
                <h3 className={cx('label')}>{labelUsername}</h3>
                <div className={cx('box-label')}>
                    <h4 className={cx('label', 'labe-2')}>{labelNickname}</h4>
                    {isCheck && <TickIcon className={cx('icon')} />}
                </div>
                <Button className={cx('bt', { hiddenAvatar })} primary>
                    Follow
                </Button>
            </div>
        </div>
    );
};

export default React.memo(BoxItem);
