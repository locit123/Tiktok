import classNames from 'classnames/bind';
import styles from './Observice.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import RightVideo from '../RightVideo';
import Video from '../Video';

const cx = classNames.bind(styles);
const VideoObService = ({
    data,
    onClick,
    className,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    handleClickComment,
    setIdVideo,
    setIsShowComment,
}) => {
    const [visibleVideo, setVisibleVideo] = useState(false);
    let divRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                let isVisible = entry.isIntersecting;
                setVisibleVideo(isVisible);
                if (isVisible && data) {
                    setIdVideo(data.id);
                    setIsShowComment(false);
                }
            },
            { threshold: 0.5 },
        );

        let currentRef = divRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => currentRef && observer.unobserve(currentRef);
    }, [data, setVisibleVideo, setIdVideo, setIsShowComment]);

    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            {data && (
                <>
                    <div className={cx('video')} ref={divRef}>
                        <Video
                            src={data.file_url}
                            type={data.type}
                            file_img={data.thumb_url}
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                            volume={volume}
                            setVolume={setVolume}
                            nickName={data.user.nickname}
                            description={data.description}
                            music={data.music}
                            visibleVideo={visibleVideo}
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
                        handleClickComment={handleClickComment}
                    />
                </>
            )}
        </div>
    );
};

export default React.memo(VideoObService);
