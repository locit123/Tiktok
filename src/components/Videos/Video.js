import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

const Video = ({ src, type, visible }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (visible) {
            if (videoRef.current) {
                videoRef.current.play();
            }
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
        let currentVideo = videoRef.current;
        return () => {
            if (!visible) {
                if (currentVideo) {
                    currentVideo.pause();
                }
            }
        };
    }, [visible]);

    return (
        <div>
            {src ? (
                <video ref={videoRef} loop autoPlay muted className={cx('wrapper')}>
                    <source src={src} type={type} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div>No video source available</div>
            )}
        </div>
    );
};

export default React.memo(Video);
