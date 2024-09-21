import React, { useState } from 'react';
import { CloseModal } from '~/components/Icons';
import classNames from 'classnames/bind';
import styles from './ModalItem.module.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import config from '~/config';

const cx = classNames.bind(styles);
const ModalItem = ({ setIsShow }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClickClose = () => {
        setIsShow(false);
    };

    const handleClickLink = (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
    };
    return (
        <div>
            <div className={cx('modal-body')}>
                <div className={cx('icon-close')}>
                    <motion.div whileHover={{ scale: 1.1 }} className={cx('icon')} onClick={handleClickClose}>
                        <CloseModal />
                    </motion.div>
                </div>
                <div className={cx('box-children')}>
                    <h2 className={cx('label')}>{isLoading ? 'Signup for TikTok' : 'Log in to TikTok'}</h2>
                    {/* Login && Signup */}
                    {isLoading ? <Signup /> : <Login />}

                    <div className={cx('footer-modal')}>
                        <p className={cx('label-items')}>
                            By continuing with an account located in
                            <Link className={cx('label-link')}>Vietnam</Link>, you agree to our
                            <Link className={cx('label-link')}>Terms of Service</Link>
                            and acknowledge that you have read our{' '}
                            <Link className={cx('label-link')}>Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('modal-footer')}>
                <div className={cx('account')}>Don’t have an account? </div>
                <a
                    href={isLoading ? config.routers.login : config.routers.signup}
                    onClick={handleClickLink}
                    className={cx('sign-up')}
                >
                    {isLoading ? 'Log in' : 'Sign up'}
                </a>
            </div>
        </div>
    );
};

export default ModalItem;
