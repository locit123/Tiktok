import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Feed.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch, faSpinner, faTv } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { BookMarkIcon, CommentIcon, FavoriteIcon, PlusIcon } from '~/components/Icons';
import ShareIcon, {
    ActiveHomeIcon,
    InboxIcon,
    MusicIcon,
    PersonIcon,
    PlusSmartphoneIcon,
    UserGroupIcon,
} from '~/components/Icons/Icons';
import { PlayVideo, PositionSmartPhone } from '~/components/WrapperSmartphone';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);
const Feed = ({ src, fileInfo, nameMusic, isUpLoading, description }) => {
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
        <PositionSmartPhone>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={cx('box-video')}>
                    {isUpLoading ? (
                        <div className={cx('box-loading')}>
                            <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                        </div>
                    ) : (
                        <video
                            onLoadedMetadata={handleLoadMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            src={src}
                            className={cx('video')}
                            ref={videoRef}
                            muted
                        >
                            <source src={src} type="video/mp4" />
                        </video>
                    )}
                </div>
                {hoverVideo && (
                    <PlayVideo
                        backGroundSeek={backGroundSeek}
                        duration={duration}
                        isPlayVideo={isPlayVideo}
                        progress={progress}
                        setIsPlayVideo={setIsPlayVideo}
                        setProgress={setProgress}
                        videoRef={videoRef}
                    />
                )}
                <div className={cx('box-top')}>
                    <FontAwesomeIcon icon={faTv} className={cx({ src })} />
                    <div className={cx('box-text-top')}>
                        <span className={cx('text-f', { src })}>Following</span>
                        <div className={cx('text-f-b')}>
                            <span className={cx('text-f', { src })}>For you</span>
                            <div className={cx('bt-text', { src })}></div>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faSearch} className={cx({ src })} />
                </div>
                <div className={cx('box-right')}>
                    <div className={cx('box-avatar')}>
                        <Image src={dataCurrentUser.avatar} alt="t" className={cx('avatar')} />
                        <div className={cx('box-plus')}>
                            <PlusIcon className={cx('ic-plus', { src })} />
                        </div>
                    </div>
                    <div className={cx('box-icon')}>
                        <FavoriteIcon className={cx('icon-box', { src })} />
                        <span className={cx('text-box-icon', { src })}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <CommentIcon className={cx('icon-box', { src })} />
                        <span className={cx('text-box-icon', { src })}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <BookMarkIcon className={cx('icon-box', { src })} />
                        <span className={cx('text-box-icon', { src })}>1000</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <ShareIcon className={cx('icon-box', { src })} />
                        <span className={cx('text-box-icon', { src })}>1000</span>
                    </div>
                </div>
                <div className={cx('box-footer')}>
                    <div className={cx('box-footer-top')}>
                        <div className={cx('box-footer-text')}>
                            <span className={cx('text-footer', { src })}>{dataCurrentUser.nickname || 'locfuho'}</span>
                            <span className={cx('text-footer', { src })}>
                                {description ? description : fileInfo.name || 'name demo'}
                            </span>
                        </div>
                        <FontAwesomeIcon icon={faCircle} className={cx('icon-footer')} />
                    </div>
                    <div className={cx('box-footer-bottom')}>
                        <MusicIcon className={cx({ src })} />
                        <span className={cx('text-footer', { src })}>{nameMusic || 'name music demo'} </span>
                    </div>
                </div>
                <div className={cx('box-bottom')}>
                    <div className={cx('bottom')}>
                        <div className={cx('box-bottom-icon')}>
                            <ActiveHomeIcon width="2.2rem" height="2.2rem" />
                            <span className={cx('text-bottom')}>Home</span>
                        </div>
                        <div className={cx('box-bottom-icon')}>
                            <UserGroupIcon width="2.2rem" height="2.2rem" />
                            <span className={cx('text-bottom')}>Friends</span>
                        </div>
                        <div className={cx('box-bottom-plus')}>
                            <PlusSmartphoneIcon />
                        </div>
                        <div className={cx('box-bottom-icon')}>
                            <InboxIcon width="2.2rem" height="2.2rem" />
                            <span className={cx('text-bottom')}>Inbox</span>
                        </div>
                        <div className={cx('box-bottom-icon')}>
                            <PersonIcon width="2rem" height="2rem" />
                            <span className={cx('text-bottom')}>Me</span>
                        </div>
                    </div>
                </div>
            </div>
        </PositionSmartPhone>
    );
};

export default Feed;
