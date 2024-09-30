import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './ModalLast.module.scss';

const cx = classNames.bind(styles);

const ModalLast = ({ children, isOpen, closeModal }) => {
    return (
        <Modal
            className={cx('wrapper')}
            overlayClassName={cx('overlay')}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
        >
            <div className={cx('children')}>{children}</div>
        </Modal>
    );
};

export default ModalLast;
