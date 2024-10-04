import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { NoneSound, Sound } from '../Icons';

const cx = classNames.bind(styles);

const Video = ({ src, type, visible, isMuted, setIsMuted, volume, setVolume }) => {
    const [isRunVideo, setIsRunVideo] = useState(false);
    const [timeOutPlay, setTimeOutPlay] = useState(false);
    const [historyVolume, setHistoryVolume] = useState();
    const [mutedVisible, setMutedVisible] = useState(true);
    const [noneMuted, setNoneMuted] = useState(false);
    const videoRef = useRef(null);
    useEffect(() => {
        if (visible) {
            if (videoRef.current) {
                videoRef.current.play();
                setIsRunVideo(true);
                setIsMuted(videoRef.current.muted);
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
    }, [visible, setIsMuted]);

    const handleClickPlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsRunVideo(true);
            setTimeOutPlay(true);
        } else {
            videoRef.current.pause();
            setIsRunVideo(false);
            setTimeOutPlay(true);
        }
    };

    useEffect(() => {
        let time;
        if (timeOutPlay) {
            setTimeout(() => {
                setTimeOutPlay(false);
            }, 500);
        }

        return () => {
            clearTimeout(time);
        };
    }, [timeOutPlay]);
    console.log(noneMuted, 'noneMuted');

    const handleClickMuted = () => {
        setNoneMuted(true);
        setIsMuted((prev) => {
            if (prev) {
                setMutedVisible(true);
                setVolume((videoRef.current.volume = historyVolume ? historyVolume : 0.5));
            } else {
                setMutedVisible(true);
                setVolume((videoRef.current.volume = 0));
            }

            return (videoRef.current.muted = !prev);
        });
    };

    useEffect(() => {
        let timeMuted;
        if (mutedVisible) {
            timeMuted = setTimeout(() => {
                setMutedVisible(false);
            }, 500);
        }

        return () => {
            clearTimeout(timeMuted);
        };
    }, [mutedVisible]);

    const handleChangeVolume = (e) => {
        let newVolume = parseFloat(e.target.value);
        setHistoryVolume(newVolume);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;

        if (newVolume === 0) {
            setIsMuted(true);
            videoRef.current.muted = true;
        } else {
            setIsMuted(false);
            videoRef.current.muted = false;
        }
    };

    return (
        <div>
            {src ? (
                <>
                    <video ref={videoRef} loop autoPlay muted={isMuted} className={cx('wrapper')}>
                        <source src={src} type={type} />
                        Your browser does not support the video tag.
                    </video>
                    {/* custom button */}
                    <div className={cx('wrapper-custom')}>
                        <button className={cx('btn-play')} onClick={handleClickPlay}>
                            {isRunVideo ? (
                                <div className={cx('box-icon', { timeOutPlay })}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPlay} />
                                </div>
                            ) : (
                                <div className={cx('box-icon', { timeOutPlay })}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faPause} />
                                </div>
                            )}
                        </button>
                        <div className={cx('volume')}>
                            <button className={cx('btn-mute')} onClick={handleClickMuted}>
                                {isMuted ? <NoneSound /> : <Sound />}
                            </button>
                            <input
                                className={cx('ip-volume')}
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={volume}
                                onChange={handleChangeVolume}
                            />
                        </div>
                        {noneMuted && (
                            <div className={cx('box-muted', { mutedVisible })}>
                                <div className={cx('icon-sound')}>{isMuted ? <NoneSound /> : <Sound />}</div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div>No video source available</div>
            )}
        </div>
    );
};

export default React.memo(Video);
