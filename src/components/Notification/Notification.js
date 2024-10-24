import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
const cx = classNames.bind(styles);
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function ModalNotification({ modalIsOpen, setIsOpen, text }) {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={cx('wrapper')}
                overlayClassName={cx('overlay-wrapper')}
            >
                <p className={cx('text-notification')}>{text}</p>
            </Modal>
        </div>
    );
}

export default ModalNotification;
