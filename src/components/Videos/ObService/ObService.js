import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Observice.module.scss';
import Video from '../Video';
import {
    BookMarkIcon,
    CommentIcon,
    FavoriteIcon,
    FloatingPlayer,
    MusicIcon,
    NoneSound,
    PlusIcon,
    ShareIconSoil,
    Sound,
    TickIcon,
    TridentHorizontal,
} from '~/components/Icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);
const VideoObService = ({
    src,
    className,
    labelFavorite,
    labelBookMark,
    labelComment,
    labelShare,
    avatar,
    isCheckIcon,
    type,
    nickname,
    description,
    nameMusic,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hidden, setHidden] = useState(false);
    const videoContainerRef = useRef(null);
    const [isSound, setIsSound] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [historyVolume, setHistoryVolume] = useState(0);
    const [isVolume, setIsVolume] = useState(false);

    useEffect(() => {
        const observice = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting !== isVisible) {
                    setIsVisible(entry.isIntersecting);
                }
            },
            { threshold: 0.5 },
        );
        const currentRef = videoContainerRef.current;

        if (currentRef) {
            observice.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observice.unobserve(currentRef);
            }
        };
    }, [isVisible]);

    const handleClickSound = useCallback(() => {
        setIsSound((prev) => {
            if (prev) {
                setVolume(historyVolume || 0.5);
            } else {
                setVolume(0);
            }

            return !prev;
        });
    }, [historyVolume]);

    const handleVolumeChange = (e) => {
        let newVolume = e.target.value;
        setVolume(newVolume);
        setHistoryVolume(newVolume);
    };
    return (
        <div ref={videoContainerRef} className={cx('wrapper')}>
            <div className={cx('box-video')}>
                <div className={cx('video')} onMouseEnter={() => setHidden(true)} onMouseLeave={() => setHidden(false)}>
                    <Video
                        muted={isSound}
                        src={src}
                        isVisible={isVisible}
                        className={className}
                        type={type}
                        volume={volume}
                    />
                    <div className={cx('box-video-top')}>
                        <div className={cx('box-sound-range')} onMouseLeave={() => setIsVolume(false)}>
                            <div
                                className={cx('icon-video-top')}
                                onClick={handleClickSound}
                                onMouseEnter={() => setIsVolume(true)}
                            >
                                {isSound ? <NoneSound /> : <Sound />}
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className={cx('volume-input', { hiddenVolume: isVolume })}
                            />
                        </div>
                        <div className={cx('icon-video-top', 'ic-hidden', { hidden })}>
                            <TridentHorizontal />
                        </div>
                    </div>
                    <div className={cx('icon-bottom', 'ic-hidden', { hidden })}>
                        <Tippy placement="top" content="Floating Player">
                            <FloatingPlayer />
                        </Tippy>
                    </div>
                    <div className={cx('box-footer')}>
                        <div className={cx('box-footer-right')}>
                            <h3 className={cx('label-footer')}>{nickname}</h3>
                            <span className={cx('label-footer')}>{description}</span>
                            <div className={cx('box-footer-icon')}>
                                <MusicIcon />
                                <h3 className={cx('label-footer')}>{nameMusic ? nameMusic : 'Demo Music'}</h3>
                            </div>
                        </div>
                        <div className={cx('more')}>more</div>
                    </div>
                </div>
                <div className={cx('box-right')}>
                    <div className={cx('box-icon', 'icon-top')}>
                        <span className={cx('icon')}>
                            <img src={avatar} alt="a" className={cx('avatar')} />
                        </span>
                        <span className={cx('icon-plus')}>{isCheckIcon ? <TickIcon /> : <PlusIcon />}</span>
                    </div>
                    <div className={cx('box-icon')}>
                        <span className={cx('icon')}>
                            <FavoriteIcon />
                        </span>
                        <strong className={cx('label')}>{labelFavorite}</strong>
                    </div>
                    <div className={cx('box-icon')}>
                        <span className={cx('icon')}>
                            <CommentIcon />
                        </span>
                        <strong className={cx('label')}>{labelComment}</strong>
                    </div>
                    <div className={cx('box-icon')}>
                        <span className={cx('icon')}>
                            <BookMarkIcon />
                        </span>
                        <strong className={cx('label')}>{labelBookMark}</strong>
                    </div>
                    <div className={cx('box-icon')}>
                        <span className={cx('icon')}>
                            <ShareIconSoil />
                        </span>
                        <strong className={cx('label')}>{labelShare}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(VideoObService);
