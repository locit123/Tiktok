import classNames from 'classnames/bind';
import styles from './VideoProfile.module.scss';
import { PlayIcon } from '~/components/Icons';
import { useEffect, useRef } from 'react';
const cx = classNames.bind(styles);
const VideoProfile = ({ visible, src, type, handleMouseEnter, viewsCount, handleClickVideo }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (visible && videoRef.current) {
            if (!videoRef.current.paused) {
                videoRef.current.pause();
            }
            videoRef.current.play();
            videoRef.current.currentTime = 0;
        }

        let currentVideoRef = videoRef.current;
        return () => {
            if (currentVideoRef) {
                currentVideoRef.pause();
            }
        };
    }, [visible]);
    return (
        <div className={cx('wrapper')} onMouseEnter={handleMouseEnter} onClick={handleClickVideo}>
            {src && (
                <>
                    <video ref={videoRef} src={src} loop autoPlay muted className={cx('video')}>
                        <source src={src} type={type || 'video/mp4'} />
                        Your browser does not support the video tag.
                    </video>
                    <div className={cx('views-count')}>
                        <PlayIcon />
                        <span>{viewsCount}M</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoProfile;
