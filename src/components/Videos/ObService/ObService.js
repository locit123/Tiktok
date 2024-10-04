import classNames from 'classnames/bind';
import styles from './Observice.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import RightVideo from '../RightVideo';
import Video from '../Video';

const cx = classNames.bind(styles);
const VideoObService = ({ data, onClick, className, isMuted, setIsMuted, volume, setVolume }) => {
    const [visible, setVisible] = useState(false);
    let divRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (data) {
                    setVisible(entry.isIntersecting);
                } else {
                    setVisible(false);
                }
            },
            { threshold: 0.5 },
        );

        let currentRef = divRef.current;
        observer.observe(currentRef);
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [data]);
    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            <div className={cx('video')} ref={divRef}>
                <Video
                    src={data.file_url}
                    type={data.type}
                    visible={visible}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    volume={volume}
                    setVolume={setVolume}
                />
            </div>
            <RightVideo
                avatar={data.user.avatar}
                isCheckIcon={data.user.is_followed}
                labelBookMark={data.views_count}
                labelComment={data.comments_count}
                labelFavorite={data.likes_count}
                labelShare={data.shares_count}
                onClick={onClick}
            />
        </div>
    );
};

export default React.memo(VideoObService);
