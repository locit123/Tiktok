import Modal from 'react-modal';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

Modal.setAppElement('#root');

const ModalComponent = ({ isShow, setIsShow, app = false, children }) => {
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

    return (
        <Modal
            isOpen={isShow}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={classes}
            overlayClassName={cx('overlay')}
            closeTimeoutMS={300}
            shouldCloseOnOverlayClick={false}
        >
            <motion.div variants={modalVariants} initial="hidden" animate="visible">
                {children}
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
