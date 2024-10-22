import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PlayVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoneSound, PlayIcon, Sound, ZoomIcon } from '~/components/Icons/Icons';
import { formatTime } from '~/utils/TimeMoment';
import { faPause } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const PlayVideo = ({ videoRef, duration, backGroundSeek, progress, setProgress, setIsPlayVideo, isPlayVideo }) => {
    const [muted, setMuted] = useState(true);
    const handleClickPlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlayVideo(true);
        } else {
            videoRef.current.pause();
            setIsPlayVideo(false);
        }
    };

    const handleChangeSeek = (e) => {
        let value = e.target.value;
        videoRef.current.currentTime = value;
        setProgress(e.target.value);
    };

    const handleClickMuted = () => {
        if (muted) {
            videoRef.current.muted = false;
        } else {
            videoRef.current.muted = true;
        }
        setMuted(!muted);
    };
    return (
        <div className={cx('box-controls')}>
            <div className={cx('box-controls-content')}>
                <input
                    type="range"
                    className={cx('ip-range')}
                    value={progress}
                    min={0}
                    max={duration || 1}
                    onChange={handleChangeSeek}
                    style={{
                        background: `linear-gradient(to right, #fe2c55 ${Math.round(
                            backGroundSeek,
                        )}%, #ddd ${Math.round(backGroundSeek)}%)`,
                    }}
                />
                <div className={cx('box-controls-left')}>
                    <div className={cx('left')}>
                        <div className={cx('play-icon')} onClick={handleClickPlay}>
                            {isPlayVideo ? (
                                <FontAwesomeIcon icon={faPause} className={cx('icon-pause')} />
                            ) : (
                                <PlayIcon />
                            )}
                        </div>
                        <span className={cx('text-time')}>
                            {formatTime(progress)} / {formatTime(duration)}
                        </span>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('muted')} onClick={handleClickMuted}>
                            {muted ? (
                                <NoneSound width="1.4rem" height="1.4rem" />
                            ) : (
                                <Sound width="1.4rem" height="1.4rem" />
                            )}
                        </div>
                        <ZoomIcon className={cx('ic-zoom')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayVideo;
