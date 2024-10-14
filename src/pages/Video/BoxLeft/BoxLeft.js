import {
    ArrowIcon,
    ExistIcon,
    FloatingPlayerIcon,
    NoneSound,
    PlayIcon,
    Sound,
    TridentHorizontal,
} from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './BoxLeft.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ARROW_DOWN, ARROW_UP, BODY_VIDEO, FIRST_VIDEO } from '~/utils/contantValue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const BoxLeft = ({
    type,
    src,
    url,
    handleClickExist,
    typeOffsetVideo,
    handleClickOffsetVideo,
    dataUserVideos,
    statusVideo,
}) => {
    const [isPlayVideo, setIsPlayVideo] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);
    const [historyVolume, setHistoryVolume] = useState();
    const [launcher, setLauncher] = useState(0);
    const [backgroundSlider, setBackgroundSlider] = useState(0);
    const [mouse, setMouse] = useState(false);
    const [mouseMuted, setMouseMuted] = useState(false);
    const [visible, setVisible] = useState(true);

    const videoRef = useRef(null);

    const handleClickToggleVideo = (e) => {
        e.stopPropagation();
        if (isPlayVideo) {
            setVisible(true);

            videoRef.current.pause();
        } else {
            setVisible(true);
            videoRef.current.play();
        }
        setIsPlayVideo(!isPlayVideo);
    };

    const handleClickMuted = () => {
        if (videoRef.current) {
            setIsMuted((prev) => {
                if (prev) {
                    setVolume((videoRef.current.volume = historyVolume ? historyVolume : 0.5));
                } else {
                    setVolume((videoRef.current.volume = 0));
                }

                return (videoRef.current.muted = !prev);
            });
        }
    };
    const handleChangeVolume = (e) => {
        let value = parseFloat(e.target.value);
        videoRef.current.volume = value;
        setHistoryVolume(value);
        setVolume(value);

        if (value === 0) {
            videoRef.current.muted = true;
            setIsMuted(true);
        } else {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    const handleChangeRange = (e) => {
        let launcher = e.target.value;
        videoRef.current.currentTime = launcher;
        setLauncher(launcher);
    };

    const onChangTimeUpdate = () => {
        if (videoRef.current) {
            setLauncher(videoRef.current.currentTime);
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setBackgroundSlider(percentage);
        }
    };

    const onLoadedMetadata = () => {
        if (videoRef.current) {
            setLauncher(videoRef.current.duration);
        }
    };

    const handleMouseEnter = useCallback(() => {
        setMouse(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setMouse(false);
    }, []);

    const handleMouseEnterBoxMuted = () => {
        setMouseMuted(true);
        setMouse(false);
    };

    const handleMouseLeaveBoxMuted = () => {
        setMouseMuted(false);
        setMouse(true);
    };

    useEffect(() => {
        let time;
        if (isPlayVideo) {
            time = setTimeout(() => {
                setVisible(false);
            }, 500);
        } else {
            time = setTimeout(() => {
                setVisible(false);
            }, 500);
        }
        return () => {
            clearTimeout(time);
        };
    }, [isPlayVideo]);

    const handleMouseNoneVideo = () => {
        setMouse(false);
    };
    const handleMouseLeaveNoneVideo = () => {
        setMouse(true);
    };
    return (
        <div className={cx('wrapper-left')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={cx('background')} style={{ backgroundImage: `url(${url})` }}></div>
            {statusVideo ? (
                <video
                    ref={videoRef}
                    src={dataUserVideos.file_url}
                    muted
                    loop
                    autoPlay
                    className={cx('video')}
                    onClick={handleClickToggleVideo}
                    onTimeUpdate={onChangTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                >
                    <source src={src} type={type} />
                </video>
            ) : (
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    autoPlay
                    className={cx('video')}
                    onClick={handleClickToggleVideo}
                    onTimeUpdate={onChangTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                >
                    <source src={src} type={type} />
                </video>
            )}
            {mouse && (
                <div className={cx('box-launcher')}>
                    <div className={cx('seek-launcher')}>
                        <input
                            type="range"
                            className={cx('launcher')}
                            min={0}
                            max={(videoRef.current && videoRef.current.duration) || 1}
                            step={0.1}
                            onChange={handleChangeRange}
                            value={launcher}
                            style={{
                                background: `linear-gradient(to right, #fe2c55 ${backgroundSlider}%, #ddd ${backgroundSlider}%)`,
                            }}
                        />
                    </div>
                    <span className={cx('time-video')}>
                        {videoRef.current &&
                            Math.round(videoRef.current.duration) &&
                            `00:${Math.round(videoRef.current.currentTime)}`}{' '}
                        / {dataUserVideos?.meta?.playtime_string ?? 0}
                    </span>
                </div>
            )}
            {isPlayVideo ? (
                <div className={cx('box-continue-video', { visible })}>
                    <FontAwesomeIcon icon={faPause} className={cx('ic-pause')} />
                </div>
            ) : (
                <div className={cx('box-continue-video', { visible })}>
                    <PlayIcon width="3.2rem" height="3.2rem" />
                </div>
            )}
            <div className={cx('box-position-top')}>
                <div className={cx('icon')} onClick={handleClickExist}>
                    <ExistIcon />
                </div>
                <div className={cx('icon')}>
                    <TridentHorizontal />
                </div>
            </div>
            <div className={cx('box-position-bottom')}>
                <div className={cx('icon')}>
                    <FloatingPlayerIcon />
                </div>
                <div
                    className={cx('icon', 'icon-muted')}
                    onClick={handleClickMuted}
                    onMouseEnter={handleMouseEnterBoxMuted}
                    onMouseLeave={handleMouseLeaveBoxMuted}
                >
                    {isMuted ? <NoneSound /> : <Sound />}
                </div>
            </div>
            <div
                className={cx('box-muted', { mouseMuted })}
                onMouseLeave={handleMouseLeaveBoxMuted}
                onMouseEnter={handleMouseEnterBoxMuted}
            >
                <div className={cx('b-muted')}>
                    <input
                        className={cx('ip-muted')}
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={handleChangeVolume}
                    />
                </div>
            </div>
            <div className={cx('box-position-center')}>
                {typeOffsetVideo === FIRST_VIDEO ? (
                    <div
                        onMouseEnter={handleMouseNoneVideo}
                        onMouseLeave={handleMouseLeaveNoneVideo}
                        className={cx('icon', 'icon-arr')}
                        onClick={() => handleClickOffsetVideo(ARROW_UP)}
                    >
                        <ArrowIcon />
                    </div>
                ) : typeOffsetVideo === BODY_VIDEO ? (
                    <>
                        <div
                            onMouseEnter={handleMouseNoneVideo}
                            onMouseLeave={handleMouseLeaveNoneVideo}
                            className={cx('icon', 'icon-arr')}
                            onClick={() => handleClickOffsetVideo(ARROW_UP)}
                        >
                            <ArrowIcon />
                        </div>
                        <div
                            onMouseEnter={handleMouseNoneVideo}
                            onMouseLeave={handleMouseLeaveNoneVideo}
                            className={cx('icon')}
                            onClick={() => handleClickOffsetVideo(ARROW_DOWN)}
                        >
                            <ArrowIcon />
                        </div>
                    </>
                ) : (
                    <div
                        onMouseEnter={handleMouseNoneVideo}
                        onMouseLeave={handleMouseLeaveNoneVideo}
                        className={cx('icon')}
                        onClick={() => handleClickOffsetVideo(ARROW_DOWN)}
                    >
                        <ArrowIcon />
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(BoxLeft);
