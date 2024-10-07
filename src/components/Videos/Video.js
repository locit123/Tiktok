import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import Volume from './Volume';
import PlayVideo from './PlayVideo';
import { NoneSound, Sound } from '../Icons';
import FloatingPlayer from './FloatingPlayer';
import TextVideo from './TextVideo';

const cx = classNames.bind(styles);

const Video = ({ src, type, visible, isMuted, setIsMuted, volume, setVolume, nickName, description, music }) => {
    const [isRunVideo, setIsRunVideo] = useState(false);
    const [timeOutPlay, setTimeOutPlay] = useState(false);
    const [historyVolume, setHistoryVolume] = useState();
    const [mutedVisible, setMutedVisible] = useState(true);
    const [noneMuted, setNoneMuted] = useState(false);
    const [isMound, setIsMound] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [widthVideo, setWidthVideo] = useState(0);
    const [isMore, setIsMore] = useState(false);

    const videoRef = useRef(null);
    useEffect(() => {
        if (visible && videoRef.current) {
            const playVideo = async () => {
                try {
                    await videoRef.current.play();
                    videoRef.current.currentTime = 0;
                    setIsRunVideo(true);
                    setIsMuted(videoRef.current.muted);
                    setWidthVideo(videoRef.current.videoWidth);
                } catch (error) {
                    console.log('loi khi phat video', error);
                }
            };

            playVideo();
        } else if (videoRef.current) {
            videoRef.current.pause();
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

    const handleClickPlay = useCallback(() => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsRunVideo(true);
            setTimeOutPlay(true);
        } else {
            videoRef.current.pause();
            setIsRunVideo(false);
            setTimeOutPlay(true);
        }
    }, []);

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

    const handleClickMuted = useCallback(() => {
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
    }, [historyVolume, setIsMuted, setVolume]);

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

    const handleChangeVolume = useCallback(
        (e) => {
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
        },
        [setIsMuted, setVolume],
    );

    const handleMouseEnter = () => {
        setIsMound(true);
    };

    const handleMouseLeave = () => {
        setIsMound(false);
    };

    const handleClickTogglePicture = async () => {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            await videoRef.current.requestPictureInPicture();
        }
    };
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime); // Cập nhật thời gian hiện tại
        }
    };
    const handleLoadMetaData = () => {
        if (videoRef.current) {
            setTotalTime(videoRef.current.duration); // Cập nhật thời gian hiện tại
        }
    };

    const handleClickProgressBar = (e) => {
        let progressBar = e.currentTarget;
        let offsetX = e.clientX - progressBar.getBoundingClientRect().left;
        let newWidth = offsetX / progressBar.clientWidth;
        const newTime = newWidth * totalTime;
        videoRef.current.currentTime = newTime;
    };
    const calculatedWidth = widthVideo - 300;

    const handleClickMore = useCallback(() => {
        setIsMore(!isMore);
    }, [isMore]);
    return (
        <div>
            {src ? (
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={cx('wrapper-parent')}>
                    <video
                        onTimeUpdate={handleTimeUpdate}
                        ref={videoRef}
                        onLoadedMetadata={handleLoadMetaData}
                        loop
                        autoPlay
                        muted={isMuted}
                        className={cx('wrapper')}
                    >
                        <source src={src} type={type} />
                        Your browser does not support the video tag.
                    </video>
                    {/* Text video */}
                    <TextVideo
                        calculatedWidth={calculatedWidth}
                        handleClickMore={handleClickMore}
                        isMore={isMore}
                        labelBody={description}
                        labelFooter={music}
                        labelHeader={nickName}
                    />
                    {/* custom button */}
                    <div className={cx('wrapper-custom')}>
                        <PlayVideo
                            handleClickPlay={handleClickPlay}
                            isRunVideo={isRunVideo}
                            timeOutPlay={timeOutPlay}
                        />
                        {noneMuted && (
                            <div className={cx('box-muted', { mutedVisible })}>
                                <div className={cx('icon-sound')}>{isMuted ? <NoneSound /> : <Sound />}</div>
                            </div>
                        )}
                        {isMound && (
                            <>
                                <Volume
                                    handleChangeVolume={handleChangeVolume}
                                    handleClickMuted={handleClickMuted}
                                    isMuted={isMuted}
                                    mutedVisible={mutedVisible}
                                    noneMuted={noneMuted}
                                    volume={volume}
                                />
                                <FloatingPlayer handleClickTogglePicture={handleClickTogglePicture} />
                            </>
                        )}
                        <div className={cx('progress-bar')} onClick={handleClickProgressBar}>
                            <div
                                className={cx('progress')}
                                style={{ width: `${(currentTime / totalTime) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No video source available</div>
            )}
        </div>
    );
};

export default React.memo(Video);
