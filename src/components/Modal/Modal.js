import Modal from 'react-modal';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CloseModal } from '../Icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextProvider } from '~/Context';

const cx = classNames.bind(styles);

Modal.setAppElement('#root');

const ModalComponent = ({
    isShow,
    setIsShow,
    app = false,
    children,
    titleTikTok,
    handleClickClose,
    href,
    handleClickLink,
    titleFooter,
}) => {
    const { isCheckCss } = useContext(ContextProvider);
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsShow(false);
    }

    const classes = cx('wrapper', {
        app,
    });

    const modalVariants = {
        hidden: {
            x: '100vw',
        },
        visible: {
            x: 0,
            transition: { duration: 0.5, type: 'spring', stiffness: 100 },
        },
    };

    const handleClickBack = () => {};

    return (
        <Modal
            isOpen={isShow}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={classes}
            overlayClassName={cx('overlay')}
            shouldCloseOnOverlayClick={false}
        >
            <motion.div variants={modalVariants} initial="hidden" animate="visible">
                <div className={cx('modal-body')}>
                    <div className={cx('box-icon')}>
                        <div className={cx('icon-back')} onClick={handleClickBack}>
                            <ArrowLeftIcon />
                        </div>
                        <div className={cx('icon-close')}>
                            <motion.div whileHover={{ scale: 1.1 }} className={cx('icon')} onClick={handleClickClose}>
                                <CloseModal />
                            </motion.div>
                        </div>
                    </div>
                    <div className={cx('children')}>
                        <div className={cx('box-children')}>
                            <h2 className={cx('label')}>{titleTikTok}</h2>
                            {children}
                        </div>
                    </div>
                </div>
                {/* footer */}
                <div className={cx('footer-modal', { isCheckCss })}>
                    <p className={cx('label-items')}>
                        By continuing with an account located in
                        <Link className={cx('label-link')}>Vietnam</Link>, you agree to our
                        <Link className={cx('label-link')}>Terms of Service</Link>
                        and acknowledge that you have read our <Link className={cx('label-link')}>Privacy Policy</Link>.
                    </p>
                </div>
                <div className={cx('modal-footer')}>
                    <div className={cx('account')}>Don’t have an account? </div>
                    <a href={href} onClick={handleClickLink} className={cx('sign-up')}>
                        {titleFooter}
                    </a>
                </div>
            </motion.div>
        </Modal>
    );
};

ModalComponent.propTypes = {
    isShow: PropTypes.bool,
    setIsShow: PropTypes.func,
    app: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default ModalComponent;
