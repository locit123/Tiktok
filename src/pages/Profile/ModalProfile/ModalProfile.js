import classNames from 'classnames/bind';
import styles from './ModalProfile.module.scss';
import Modal from 'react-modal';
import { CloseModal, EditIcon } from '~/components/Icons';
import a from '~/assets/images/aFB.jpg';
import Input from '~/components/Input';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

Modal.setAppElement('#root');

const ModalProfile = ({ modalIsOpen, setIsOpen }) => {
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Modal
            className={cx('wrapper')}
            overlayClassName={cx('overlay')}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
        >
            <div className={cx('header')}>
                <h1 className={cx('title')}>Edit profile</h1>
                <div className={cx('close')} onClick={() => setIsOpen(false)}>
                    <CloseModal />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Profile photo</div>
                    <div className={cx('box-img-icon')}>
                        <img src={a} alt="test" className={cx('avatar')} />
                        <div className={cx('icon')}>
                            <EditIcon />
                        </div>
                    </div>
                </div>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Username</div>
                    <div className={cx('box-right', 'box-height')}>
                        <Input className={cx('input')} />
                        <p className={cx('title-text', 'text')}>www.tiktok.com/@phnglc10</p>
                        <p className={cx('title-text', 'text2')}>
                            Usernames can only contain letters, numbers, underscores, and periods. Changing your
                            username will also change your profile link.
                        </p>
                    </div>
                </div>
                <div className={cx('box-1')}>
                    <div className={cx('label')}>Name</div>
                    <div className={cx('box-right')}>
                        <Input className={cx('input')} />
                        <p className={cx('title-text', 'text2')}>
                            Your nickname can only be changed once every 7 days.
                        </p>
                    </div>
                </div>
                <div className={cx('box-1', 'box-2')}>
                    <div className={cx('label')}>Bio</div>
                    <div className={cx('box-right', 'box-area')}>
                        <textarea className={cx('text-area')} placeholder="Bio"></textarea>
                        <span className={cx('length-text')}>0/80</span>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('box-bt')}>
                    <Button className={cx('bt', 'bt-hover')}>Cancel</Button>
                    <Button className={cx('bt')}>Save</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalProfile;
