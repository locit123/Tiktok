import classNames from 'classnames/bind';
import styles from './Volume.module.scss';
import { NoneSound, Sound } from '~/components/Icons';
import React, { useState } from 'react';
import MenuVideo from '../MenuVideo';

const cx = classNames.bind(styles);

const Volume = ({ isMuted, handleClickMuted, volume, handleChangeVolume }) => {
    const [mound, setMound] = useState(false);

    const handleMouseEnter = () => {
        setMound(true);
    };

    const handleMouseLeave = () => {
        setMound(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('volume')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <button className={cx('btn-mute')} onClick={handleClickMuted}>
                    {isMuted ? <NoneSound /> : <Sound />}
                </button>
                {mound && (
                    <div className={cx('box-ip')}>
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
                )}
            </div>

            <MenuVideo />
        </div>
    );
};

export default React.memo(Volume);
