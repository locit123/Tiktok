import classNames from 'classnames/bind';
import styles from './PlayVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
const cx = classNames.bind(styles);
const PlayVideo = ({ handleClickPlay, isRunVideo, timeOutPlay }) => {
    return (
        <>
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
        </>
    );
};

export default React.memo(PlayVideo);
