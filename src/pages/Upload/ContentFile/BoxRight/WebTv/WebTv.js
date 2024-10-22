import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import a from '~/assets/images/aFB.jpg';
import styles from './WebTv.module.scss';
import Image from '~/components/Image';
import { BookMarkIcon, CommentIcon, FavoriteIcon, PlusIcon } from '~/components/Icons';
import ShareIcon from '~/components/Icons/Icons';
import { PlayVideo } from '~/components/WrapperSmartphone';
import { ContextProvider } from '~/Context';
const cx = classNames.bind(styles);
const WebTv = ({ src, fileInfo }) => {
    const videoRef = useRef(null);
    const { dataCurrentUser } = useContext(ContextProvider);
    const [isPlayVideo, setIsPlayVideo] = useState(false);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [backGroundSeek, setBackGroundSeek] = useState(0);
    const [hoverVideo, setHoverVideo] = useState(false);

    const handleLoadMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setProgress(videoRef.current.currentTime);
            setBackGroundSeek((videoRef.current.currentTime / duration) * 100);
            if (videoRef.current.currentTime >= duration) {
                setIsPlayVideo(false);
            }
        }
    };
    const handleMouseEnter = () => {
        setHoverVideo(true);
    };
    const handleMouseLeave = () => {
        setHoverVideo(false);
    };
    return (
        <div className={cx('wrapper')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={cx('box-left')}>
                <div className={cx('box-left-content')}>
                    <span className={cx('text-content')}>{dataCurrentUser.nickname || 'locfuho'}</span>
                    <span className={cx('text-content')}>{fileInfo.name || '15.chau thi ngoc tram_ ps22752'}</span>
                </div>
            </div>
            <div className={cx('box-video')}>
                {src && (
                    <video
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadMetadata}
                        src={src}
                        className={cx('video')}
                        ref={videoRef}
                        muted
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                )}
            </div>
            {/* custome controls */}
            {hoverVideo && (
                <PlayVideo
                    backGroundSeek={backGroundSeek}
                    duration={duration}
                    videoRef={videoRef}
                    progress={progress}
                    setProgress={setProgress}
                    isPlayVideo={isPlayVideo}
                    setIsPlayVideo={setIsPlayVideo}
                />
            )}
            {/*-------------*/}
            <div className={cx('box-right')}>
                <div className={cx('box-avatar')}>
                    <Image src={dataCurrentUser.avatar || a} alt="t" className={cx('avatar')} />
                    <div className={cx('box-plus')}>
                        <PlusIcon className={cx('ic-plus')} />
                    </div>
                </div>
                <div className={cx('box-icon-top')}>
                    <div className={cx('box-icon')}>
                        <FavoriteIcon className={cx('icon-box')} />
                        <span className={cx('text-box-icon')}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <CommentIcon className={cx('icon-box')} />
                        <span className={cx('text-box-icon')}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <BookMarkIcon className={cx('icon-box')} />
                        <span className={cx('text-box-icon')}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <ShareIcon className={cx('icon-box')} />
                        <span className={cx('text-box-icon')}>1000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebTv;
