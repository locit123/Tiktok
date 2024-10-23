import classNames from 'classnames/bind';
import styles from './BoxItem.module.scss';
import React, { useEffect, useRef } from 'react';
import { TickIcon } from '../Icons';
import Button from '../Button';
const cx = classNames.bind(styles);
const BoxItem = ({ hiddenAvatar = false, handleClickFollow, handleClickItem, data, visible }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        let currentRef = videoRef.current;
        if (currentRef && visible) {
            currentRef.play().catch((e) => console.log('error', e));
        }
        return () => {
            if (currentRef) {
                currentRef.pause();
            }
        };
    }, [visible]);

    return (
        <div className={cx('wrapper')} onClick={handleClickItem}>
            <video ref={videoRef} src={data.popular_video.file_url} muted loop className={cx('video')}>
                <source src={data.popular_video.file_url} type={data.popular_video.meta.mime_type} />
                Your browser does not support the video tag.
            </video>
            <div className={cx('box-body')}>
                <img src={data.avatar} alt="a" className={cx('avatar', { hiddenAvatar })} />
                <h3 className={cx('label')}>
                    {data.first_name} {data.last_name}
                </h3>
                <div className={cx('box-label')}>
                    <h4 className={cx('label', 'labe-2')}>{data.nickname}</h4>
                    {data.tick && <TickIcon className={cx('icon')} />}
                </div>
                <Button
                    className={cx('bt', { hiddenAvatar, isFollow: data.is_followed })}
                    primary
                    onClick={handleClickFollow}
                >
                    {data.is_followed ? 'Following' : 'Follow'}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(BoxItem);
