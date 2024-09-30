import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

const Video = ({ src, isVisible, className, type, muted, volume }) => {
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentRef = videoRef.current;
        if (currentRef) {
            if (isVisible) {
                currentRef.play().catch((error) => {
                    console.error('Error attempting to play:', error);
                });
            } else {
                currentRef.pause();
            }
        }
        return () => {
            if (currentRef) {
                currentRef.pause();
            }
        };
    }, [isVisible]);

    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            const currentProgress = (video.currentTime / video.duration) * 100 || 0;
            setProgress(currentProgress);
        };

        const handleCanPlay = () => {
            if (isVisible) {
                video.play().catch((error) => {
                    console.error('Error attempting to play:', error);
                });
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, [isVisible]);

    // Cập nhật âm lượng mỗi khi giá trị 'volume' thay đổi
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume; // Thiết lập âm lượng cho video
        }
    }, [volume]);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch((error) => {
                    console.error('Error attempting to play:', error);
                });
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handleProgressClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const totalWidth = rect.width;
        const newTime = (clickPosition / totalWidth) * videoRef.current.duration;

        videoRef.current.currentTime = newTime;
    };

    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={cx('video-container')}>
            <video
                ref={videoRef}
                src={src}
                muted={muted}
                loop
                playsInline
                className={classes}
                onClick={handleVideoClick}
            >
                <source src={src} type={type} />
            </video>
            <div className={cx('progress-bar')} onClick={handleProgressClick}>
                <div className={cx('progress')} style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

export default React.memo(Video);
