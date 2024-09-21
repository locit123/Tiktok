import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './GetApp.module.scss';
import ModalComponent from '~/components/Modal';
import { CloseModal } from '../Icons';
import images from '~/assets/images';
import { motion } from 'framer-motion';
const cx = classNames.bind(styles);

const GetApp = () => {
    const [isShow, setIsShow] = useState(false);
    const handleClick = () => {
        setIsShow(true);
    };

    const handleClickClose = () => {
        setIsShow(false);
    };
    return (
        <>
            <button className={cx('wrapper')} onClick={handleClick}>
                Get app
            </button>
            <ModalComponent app isShow={isShow} setIsShow={setIsShow}>
                <div className={cx('modal-wrapper')}>
                    <div className={cx('header')}>
                        <p className={cx('title')}>Get the TikTok app</p>
                        <motion.div whileHover={{ scale: 1.1 }} className={cx('icon')} onClick={handleClickClose}>
                            <CloseModal className={cx('icon')} />
                        </motion.div>
                    </div>
                    <div className={cx('body')}>
                        <p className={cx('title-body')}>Scan QR code to download TikTok</p>
                        <img className={cx('img-qr')} alt="" src={images.qrApp} />
                        <p className={cx('title-download')}>Download from app stores</p>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('items-1')}>
                            <img className={cx('img')} alt="m" src={images.microsoft} />
                            <img className={cx('img')} alt="m" src={images.appStore} />
                        </div>
                        <div className={cx('items-1')}>
                            <img className={cx('img')} alt="m" src={images.amazon} />
                            <img className={cx('img')} alt="m" src={images.googlePlay} />
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

export default GetApp;
